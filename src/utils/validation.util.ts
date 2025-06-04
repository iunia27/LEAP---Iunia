import { ValidationError } from 'yup';

/**
 * Extracts validation errors from a Yup ValidationError object.
 * @param error - The ValidationError object from Yup.
 * @returns A record of field names and their corresponding error messages.
 */
export function extractValidationErrors(error: ValidationError): Record<string, string> {
  return error.inner.reduce((acc, err) => {
    if (err.path) {
      acc[err.path] = err.message;
    }
    return acc;
  }, {} as Record<string, string>);
}