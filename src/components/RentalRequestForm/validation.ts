import { RentalRequestFormData, FormErrors } from './types';

export const validateContactInfo = (formData: RentalRequestFormData): FormErrors => {
  const errors: FormErrors = { customerInfo: {} };

  if (!formData.customerInfo.firstName.trim()) {
    errors.customerInfo!.firstName = 'First name is required';
  }

  if (!formData.customerInfo.lastName.trim()) {
    errors.customerInfo!.lastName = 'Last name is required';
  }

  if (!formData.customerInfo.email.trim()) {
    errors.customerInfo!.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.customerInfo.email)) {
    errors.customerInfo!.email = 'Invalid email format';
  }

  if (!formData.customerInfo.phone.trim()) {
    errors.customerInfo!.phone = 'Phone number is required';
  } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.customerInfo.phone)) {
    errors.customerInfo!.phone = 'Invalid phone number format';
  }

  return errors;
};

export const validateRampDetails = (formData: RentalRequestFormData): FormErrors => {
  const errors: FormErrors = { rampDetails: {} };

  if (formData.rampDetails.knowRampLength && (!formData.rampDetails.rampLength || formData.rampDetails.rampLength <= 0)) {
    errors.rampDetails!.rampLength = 'Please enter a valid ramp length';
  }

  if (formData.rampDetails.knowRentalDuration && (!formData.rampDetails.rentalDuration || formData.rampDetails.rentalDuration <= 0)) {
    errors.rampDetails!.rentalDuration = 'Please enter a valid rental duration';
  }

  if (!['Within 24 hours', 'Within 2 days', 'Within 3 days', 'Within 1 week', 'Over 1 week'].includes(formData.rampDetails.installTimeframe)) {
    errors.rampDetails!.installTimeframe = 'Please select a valid installation timeframe';
  }

  if (formData.rampDetails.mobilityAids.length === 0 || 
      !formData.rampDetails.mobilityAids.every(aid => ['wheelchair', 'motorized_scooter', 'walker_cane', 'none'].includes(aid))) {
    errors.rampDetails!.mobilityAids = 'Please select valid mobility aids';
  }

  if (!formData.installAddress.trim()) {
    errors.installAddress = 'Installation address is required';
  }

  return errors;
};