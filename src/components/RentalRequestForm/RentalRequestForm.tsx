import React, { useState } from 'react';
import { ContactInfoForm } from './ContactInfoForm';
import { RampDetailsForm } from './RampDetailsForm';
import { ConfirmationPage } from './ConfirmationPage';
import { RentalRequestFormData, FormErrors, FormChangeHandler } from './types';
import { submitRentalRequest, RentalRequestResponse } from '../../services/api';

const RentalRequestForm: React.FC = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState<RentalRequestFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    knowRampLength: 'no',
    estimatedRampLength: '',
    knowRentalDuration: 'no',
    estimatedRentalDuration: '',
    installationTimeframe: '',
    mobilityAids: [],
    installAddress: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange: FormChangeHandler = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    // Implement your form validation logic here
    // Return true if the form is valid, false otherwise
    return true;
  };

  const handleNextPage = () => {
    if (validateForm()) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    setPage(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response: RentalRequestResponse = await submitRentalRequest(formData);
        console.log('Form submitted successfully:', response);
        setPage(3); // Move to the confirmation page
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleStartOver = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      knowRampLength: 'no',
      estimatedRampLength: '',
      knowRentalDuration: 'no',
      estimatedRentalDuration: '',
      installationTimeframe: '',
      mobilityAids: [],
      installAddress: '',
    });
    setPage(1);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {page < 3 ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {page === 1 && (
            <ContactInfoForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onNextPage={handleNextPage}
            />
          )}
          {page === 2 && (
            <RampDetailsForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onPrevPage={handlePrevPage}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
          {submitError && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Error: {submitError}
            </div>
          )}
        </form>
      ) : (
        <ConfirmationPage onStartOver={handleStartOver} />
      )}
    </div>
  );
};

export default RentalRequestForm;