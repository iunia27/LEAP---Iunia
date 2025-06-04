import { VALIDATION_ERROR, FORM_SUBMISSION_ERROR, FORM_SUBMISSION_SUCCESS } from "@/constants/form.constants";

  
  export const getFormMessage = (errorCode?: string): string=> {
    switch (errorCode) {
    case VALIDATION_ERROR:
         return 'Validation failed. Please check your input.';
    case FORM_SUBMISSION_ERROR:
        return 'There was an error submitting the form. Please try again later.';
    case FORM_SUBMISSION_SUCCESS:
        return 'Form submitted successfully!';
    default:
        return 'An unexpected error occurred.';
    }
};
