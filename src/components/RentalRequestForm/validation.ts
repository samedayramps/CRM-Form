import { RentalRequestFormData, FormErrors } from './types';

export const validateContactInfo = (formData: RentalRequestFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  return errors;
};