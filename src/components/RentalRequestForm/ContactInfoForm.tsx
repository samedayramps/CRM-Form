import React from 'react';
import { FormField } from './FormField';
import { Button } from '../ui/Button';
import { RentalRequestFormData, FormErrors, FormChangeHandler } from './types';
import { validateContactInfo } from './validation'; // We'll create this file later

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
    const value = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(value);
    onChange('customerInfo.phone', formattedPhoneNumber);
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength <= 3) {
      return phoneNumber;
    } else if (phoneNumberLength <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleNextPage = () => {
    const validationErrors = validateContactInfo(formData);
    if (Object.keys(validationErrors.customerInfo || {}).length === 0) {
      onNextPage();
    } else {
      // Update errors state in parent component
      Object.entries(validationErrors.customerInfo || {}).forEach(([field, error]) => {
        onChange(`customerInfo.${field}`, formData.customerInfo[field as keyof typeof formData.customerInfo], error);
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <FormField
        label="First Name"
        name="customerInfo.firstName"
        value={formData.customerInfo.firstName}
        onChange={(e) => onChange('customerInfo.firstName', e.target.value)}
        error={errors.customerInfo?.firstName}
        required
      />
      <FormField
        label="Last Name"
        name="customerInfo.lastName"
        value={formData.customerInfo.lastName}
        onChange={(e) => onChange('customerInfo.lastName', e.target.value)}
        error={errors.customerInfo?.lastName}
        required
      />
      <FormField
        label="Email Address"
        name="customerInfo.email"
        type="email"
        value={formData.customerInfo.email}
        onChange={(e) => onChange('customerInfo.email', e.target.value)}
        error={errors.customerInfo?.email}
        required
      />
      <FormField
        label="Phone Number"
        name="customerInfo.phone"
        type="tel"
        value={formData.customerInfo.phone}
        onChange={handlePhoneChange}
        error={errors.customerInfo?.phone}
        required
        placeholder="(123) 456-7890"
      />
      <div className="flex justify-center mt-6">
        <Button 
          type="button" 
          onClick={handleNextPage} 
          className="btn btn-primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};