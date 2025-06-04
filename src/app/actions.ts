// app/actions.ts
import { ContactUsItem, useSubmitForm } from '@/hooks/submitForm.hook';
import { ValidationError } from 'yup';
import { contactUsSchema } from '@/validation/contactUsSchema';
import { extractValidationErrors } from '@/utils/validation.util';
import { startTransition } from 'react';
import { getFormMessage } from '@/utils/errorHandling.util';
import { VALIDATION_ERROR, FORM_SUBMISSION_SUCCESS, FORM_SUBMISSION_ERROR } from '@/constants/form.constants';

// Interface for the result of form submission
export interface SubmitContactFormResult {
  success?: boolean;
  errors: Record<string, string>;
  message: string;
  enteredValue: {
    fullName: string;
    email: string;
    message: string;
  };
}

// Submit Contact Form Function
export async function submitContactForm(
  prevState: SubmitContactFormResult,
  formData: FormData,
  
): Promise<SubmitContactFormResult> {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  // Construct the ContactUsObject
  const ContactUsObject: ContactUsItem = { fullName, email, message };
  const EmptyContactUsObject: ContactUsItem = { fullName: '', email: '', message: '' };
  // Validate the form data
  try {
    await contactUsSchema.validate(ContactUsObject, { abortEarly: false });
  } catch (error) {
    const validationError = error as ValidationError;
    const errors = extractValidationErrors(validationError);
    console.error('Validation errors:', errors);
    return{
      success: false,
      errors,
      message: getFormMessage(VALIDATION_ERROR),
      enteredValue: ContactUsObject,
    }
  }

  //Submit the form data
try {
  // Using startTransition to ensure the form submission is handled as a transition
  const result = await new Promise((resolve) => {
    startTransition(async () => {
      const rsp = await useSubmitForm()?.submitForm(ContactUsObject);

      // if (rsp.success) {
      //   resolve({
      //     success: true,
      //     errors: {},
      //     message: getFormMessage(FORM_SUBMISSION_SUCCESS),
      //     enteredValue: EmptyContactUsObject,
      //   });
      //   return;
      // }
      // Construct the result object
      const result = {
        success: rsp?.success || false,
        errors: rsp?.error ? {message: rsp?.error}: {},
        message: rsp?.success
          ? getFormMessage(FORM_SUBMISSION_SUCCESS)
          : getFormMessage(FORM_SUBMISSION_ERROR),
        enteredValue: rsp?.success ? EmptyContactUsObject : ContactUsObject,
      };
      console.log('Form submission result:', result);
      resolve(result); // Resolve the promise with the result
    });
  });

  return Promise.resolve(result) as unknown as SubmitContactFormResult; // Ensure the function returns a resolved promise
} catch (error) {
  console.error('Form submission error:', error);

  // Return a resolved promise with the error response
  return Promise.resolve({
    success: false,
    errors: {},
    message: "form: " + getFormMessage(),
    enteredValue: ContactUsObject,
  });
}}

