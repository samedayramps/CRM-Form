import React, { useState, useEffect, useCallback } from 'react';
import { ContactInfoForm } from './ContactInfoForm';
import { RampDetailsForm } from './RampDetailsForm';
import { ConfirmationPage } from './ConfirmationPage';
import { RentalRequestFormData, FormErrors, FormChangeHandler } from './types';
import { submitRentalRequest, RentalRequestResponse } from '../../services/api';

export const RentalRequestForm: React.FC = () => {
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
  const [currentPage, setCurrentPage] = useState(0);

  const handleChange: FormChangeHandler = (field, value, error?) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
    if (error !== undefined) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const sendHeight = useCallback(() => {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ type: 'setHeight', height }, '*');
  }, []);

  useEffect(() => {
    sendHeight();

    const resizeObserver = new ResizeObserver(() => {
      sendHeight();
    });

    resizeObserver.observe(document.body);

    window.addEventListener('load', sendHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('load', sendHeight);
    };
  }, [sendHeight]);

  useEffect(() => {
    sendHeight();
  }, [currentPage, formData, sendHeight]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response: RentalRequestResponse = await submitRentalRequest(formData);
        console.log('Form submitted successfully:', response);
        setCurrentPage(2); // Move to the confirmation page
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Remove handleStartOver function as it's no longer needed

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.installationTimeframe) newErrors.installationTimeframe = 'Installation timeframe is required';
    if (!formData.installAddress) newErrors.installAddress = 'Installation address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="rental-form-container w-full max-w-lg mx-auto py-4 px-4 sm:px-6 lg:px-8">
      {currentPage < 2 ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-6 py-8 mb-4">
          <div className="mb-6">
            {currentPage === 0 && (
              <ContactInfoForm
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onNextPage={handleNextPage}
              />
            )}
            {currentPage === 1 && (
              <RampDetailsForm
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onPrevPage={handlePrevPage}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
          {submitError && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              Error: {submitError}
            </div>
          )}
        </form>
      ) : (
        <ConfirmationPage />
      )}
    </div>
  );
};

export default RentalRequestForm;