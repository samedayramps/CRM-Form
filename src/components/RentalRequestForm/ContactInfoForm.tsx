import React from 'react';
import { FormField } from './FormField';
import { Button } from '../ui/Button';
import { RentalRequestFormData, FormErrors, FormChangeHandler } from './types';

interface ContactInfoFormProps {
  formData: RentalRequestFormData;
  errors: FormErrors;
  onChange: FormChangeHandler;
  onNextPage: () => void;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  formData,
  errors,
  onChange,
  onNextPage,
}) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    onChange('phone', formattedPhoneNumber);
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <FormField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        error={errors.firstName}
        required
      />
      <FormField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        error={errors.lastName}
        required
      />
      <FormField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => onChange('email', e.target.value)}
        error={errors.email}
        required
      />
      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handlePhoneChange}
        error={errors.phone}
        required
      />
      <div className="flex items-center justify-between">
        <Button type="button" onClick={onNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};