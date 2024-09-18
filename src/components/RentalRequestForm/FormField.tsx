import React, { forwardRef } from 'react';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils'; // Make sure this import is correct

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  options?: { value: string; label: string }[];
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, error, options, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
        {options ? (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  {...props}
                  className="form-radio h-5 w-5"
                />
                <span className="ml-2 text-input">{option.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <Input
            id={name}
            name={name}
            ref={ref}
            className={cn("form-input", className)}
            {...props}
          />
        )}
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';