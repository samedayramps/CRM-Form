import React, { forwardRef } from 'react';
import { Input } from '../ui/Input';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  options?: { value: string; label: string }[];
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, error, options, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
          {label}
        </label>
        {options ? (
          <div>
            {options.map((option) => (
              <label key={option.value} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  {...props}
                  className="form-radio"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <Input
            id={name}
            name={name}
            ref={ref}
            {...props}
          />
        )}
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';