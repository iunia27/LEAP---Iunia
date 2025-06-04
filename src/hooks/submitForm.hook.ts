export type ContactUsItem = {
  fullName: string
  email: string
  message: string
}
export const useSubmitForm = () => {

  const submitForm = async (data: ContactUsItem) => {
    console.log("Submitting form with data:", data);
    try {
      const response = await fetch("/api/contactable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Form submission result:", result);
      return result;
    } catch (err) {
      console.error("Form submission error:", err);
      throw err;
    }
  };
  // Return the submitForm function to be used in components
  return { submitForm };
};


   