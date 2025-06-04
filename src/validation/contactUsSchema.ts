import { object, string } from 'yup';

export const contactUsSchema = object({
  fullName: string()
    .min(2, 'Full Name must contain at least 2 characters')
    .matches(/^[a-zA-Z\s\-]+$/, 'Full Name must only contain letters')
    .required('Full Name is required'),
  email: string()
    .email('Invalid email format')
    .required('Email is required'),
  message: string()
    .min(10, 'Message must contain at least 10 characters')
    .max(1000, 'Message must not contain more than 1000 characters')
    .required('Message is required'),
});