import React from 'react';
import { Button } from '../ui/Button';

interface ConfirmationPageProps {
  onStartOver: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onStartOver }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Thank You!</h2>
      <p className="mb-4">
        Your rental request has been successfully submitted. We appreciate your interest in our wheelchair ramp rental service.
      </p>
      <p className="mb-4">
        Our team will review your request and reach out to you shortly with more information and next steps.
      </p>
      <p className="mb-6">
        If you have any immediate questions or concerns, please don't hesitate to contact us directly.
      </p>
      <Button onClick={onStartOver}>Submit Another Request</Button>
    </div>
  );
};