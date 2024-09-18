# webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    open: true,
  },
};
```

# tsconfig.json

```json
{
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": false,
      "jsx": "react-jsx"
    },
    "include": ["src"]
  }
```

# tailwind.config.js

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

# postcss.config.js

```js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
```

# package.json

```json
{
  "name": "standalone-rental-form",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.0",
    "axios": "^1.7.6",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cors": "^2.8.5",
    "lucide-react": "^0.436.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@types/google.maps": "^3.57.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "autoprefixer": "^10.4.13",
    "css-loader": "^6.7.3",
    "dotenv-webpack": "^8.1.0",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.7.2",
    "postcss": "^8.4.21",
    "postcss-loader": "^7.0.2",
    "tailwindcss": "^3.2.7",
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.5",
    "webpack": "^5.94.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.2"
  }
}

```

# netlify.toml

```toml
[build]
  publish = "dist"  # or "build", matching your webpack output
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

# src/index.tsx

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import RentalRequestForm from './components/RentalRequestForm/RentalRequestForm';
import './styles/index.css';

const container = document.getElementById('standalone-rental-form');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <RentalRequestForm />
    </React.StrictMode>
  );
}
```

# public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rental Request Form</title>
</head>
<body>
    <div id="standalone-rental-form"></div>
</body>
</html>
```

# .netlify/state.json

```json
{
	"siteId": "b392388b-85ef-44d9-a997-aa0b7cf03c99"
}
```

# .netlify/netlify.toml

```toml
redirectsOrigin = "config"
plugins = []
headers = []

[functions]

[functions."*"]

[build]
publish = "/Users/tywalls/Projects/samedayramps/new-crm/standalone-form/dist"
publishOrigin = "config"
commandOrigin = "config"
base = "/Users/tywalls/Projects/samedayramps/new-crm/standalone-form"
command = "npm run build"

[build.environment]

[build.processing]

[build.processing.css]

[build.processing.html]

[build.processing.images]

[build.processing.js]

[build.services]

[[redirects]]
from = "/*"
to = "/index.html"
status = 200.0
force = false

[redirects.query]

[redirects.conditions]

[redirects.headers]
```

# src/utils/googleMapsLoader.ts

```ts
declare global {
    interface Window {
      initMap: () => void;
    }
  }
  
  let isLoaded = false;
  let loadPromise: Promise<void> | null = null;
  
  export const loadGoogleMapsAPI = (): Promise<void> => {
    if (isLoaded) {
      return Promise.resolve();
    }
  
    if (loadPromise) {
      return loadPromise;
    }
  
    loadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
  
      window.initMap = () => {
        isLoaded = true;
        resolve();
      };
  
      script.onerror = reject;
      document.head.appendChild(script);
    });
  
    return loadPromise;
  };
```

# src/types/google-maps.d.ts

```ts
declare global {
    interface Window {
      google: any;
    }
  }
```

# src/styles/index.css

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Add any custom styles here */
```

# src/services/api.ts

```ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RentalRequestFormData } from '../components/RentalRequestForm/types';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://app.samedayramps.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface RentalRequestResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  knowRampLength: string;
  estimatedRampLength?: string;
  knowRentalDuration: string;
  estimatedRentalDuration?: string;
  installationTimeframe: string;
  mobilityAids: string[];
  installAddress: string;
  createdAt: string;
}

export const submitRentalRequest = async (formData: RentalRequestFormData): Promise<RentalRequestResponse> => {
  try {
    const response: AxiosResponse<RentalRequestResponse> = await api.post('/api/rental-requests', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting rental request:', error);
    throw error;
  }
};

export default api;
```

# src/lib/utils.ts

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

# src/components/RentalRequestForm/validation.ts

```ts
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
```

# src/components/RentalRequestForm/types.ts

```ts
export interface RentalRequestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  knowRampLength: string;
  estimatedRampLength: string;
  knowRentalDuration: string;
  estimatedRentalDuration: string;
  installationTimeframe: string;
  mobilityAids: string[];
  installAddress: string;
}
  
  export interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    knowRampLength?: string;
    estimatedRampLength?: string;
    knowRentalDuration?: string;
    estimatedRentalDuration?: string;
    installationTimeframe?: string;
    mobilityAids?: string;
    installAddress?: string;
  }
  
  export type FormChangeHandler = (
    field: keyof RentalRequestFormData,
    value: string | string[],
    error?: string
  ) => void;
```

# src/components/RentalRequestForm/RentalRequestForm.tsx

```tsx
import React, { useState } from 'react';
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
        setCurrentPage(3); // Move to the confirmation page
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
    setCurrentPage(0);
  };

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
    <div className="max-w-md mx-auto mt-10">
      {currentPage < 3 ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
```

# src/components/RentalRequestForm/RampDetailsForm.tsx

```tsx
import React, { useEffect, useRef } from 'react';
import { FormField } from './FormField';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { RentalRequestFormData, FormErrors, FormChangeHandler } from './types';
import { loadGoogleMapsAPI } from '../../utils/googleMapsLoader';

interface RampDetailsFormProps {
  formData: RentalRequestFormData;
  errors: FormErrors;
  onChange: FormChangeHandler;
  onPrevPage: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const RampDetailsForm: React.FC<RampDetailsFormProps> = ({
  formData,
  errors,
  onChange,
  onPrevPage,
  onSubmit,
  isSubmitting,
}) => {
  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      if (window.google && addressInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'us' },
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            onChange('installAddress', place.formatted_address);
          }
        });
      }
    }).catch(error => {
      console.error('Error loading Google Maps API:', error);
    });
  }, [onChange]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ramp Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Do you know how long of a ramp you need?
        </label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="knowRampLength"
              value="yes"
              checked={formData.knowRampLength === 'yes'}
              onChange={(e) => {
                console.log('Ramp length changed to:', e.target.value); // Debug log
                onChange('knowRampLength', e.target.value);
              }}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="knowRampLength"
              value="no"
              checked={formData.knowRampLength === 'no'}
              onChange={(e) => onChange('knowRampLength', e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      
      {formData.knowRampLength === 'yes' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedRampLength">
            Estimated ramp length required (in feet)
          </label>
          <Input
            type="number"
            name="estimatedRampLength"
            id="estimatedRampLength"
            value={formData.estimatedRampLength}
            onChange={(e) => onChange('estimatedRampLength', e.target.value)}
            min="4"
            max="60"
            step="1"
          />
          {errors.estimatedRampLength && <p className="text-red-500 text-xs italic">{errors.estimatedRampLength}</p>}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Do you know how long you need the ramp?
        </label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="knowRentalDuration"
              value="yes"
              checked={formData.knowRentalDuration === 'yes'}
              onChange={(e) => {
                console.log('Rental duration changed to:', e.target.value); // Debug log
                onChange('knowRentalDuration', e.target.value);
              }}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="knowRentalDuration"
              value="no"
              checked={formData.knowRentalDuration === 'no'}
              onChange={(e) => onChange('knowRentalDuration', e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      {formData.knowRentalDuration === 'yes' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedRentalDuration">
            Estimated rental duration (in months)
          </label>
          <Input
            type="number"
            name="estimatedRentalDuration"
            id="estimatedRentalDuration"
            value={formData.estimatedRentalDuration}
            onChange={(e) => onChange('estimatedRentalDuration', e.target.value)}
            min="1"
            max="72"
            step="1"
          />
          {errors.estimatedRentalDuration && <p className="text-red-500 text-xs italic">{errors.estimatedRentalDuration}</p>}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">How soon do you need it installed?</label>
        <Select
          name="installationTimeframe"
          value={formData.installationTimeframe}
          onChange={(e) => onChange('installationTimeframe', e.target.value)}
        >
          <option value="">Select timeframe</option>
          <option value="Immediately">Immediately</option>
          <option value="Within a week">Within a week</option>
          <option value="Within two weeks">Within two weeks</option>
          <option value="Within a month">Within a month</option>
          <option value="No rush">No rush</option>
        </Select>
        {errors.installationTimeframe && <p className="text-red-500 text-xs italic">{errors.installationTimeframe}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Mobility aids to be used with the ramp</label>
        {['Wheelchair', 'Motorized scooter', 'Walker/cane', 'None'].map((aid) => (
          <div key={aid}>
            <label className="inline-flex items-center">
              <Checkbox
                name="mobilityAids"
                value={aid}
                checked={formData.mobilityAids.includes(aid)}
                onCheckedChange={(checked) => {
                  const newMobilityAids = checked
                    ? [...formData.mobilityAids, aid]
                    : formData.mobilityAids.filter((item) => item !== aid);
                  onChange('mobilityAids', newMobilityAids);
                }}
              />
              <span className="ml-2">{aid}</span>
            </label>
          </div>
        ))}
        {errors.mobilityAids && <p className="text-red-500 text-xs italic">{errors.mobilityAids}</p>}
      </div>
      <FormField
        label="Installation Address"
        name="installAddress"
        value={formData.installAddress}
        onChange={(e) => onChange('installAddress', e.target.value)}
        error={errors.installAddress}
        required
        ref={addressInputRef}
        placeholder="Start typing an address..."
      />
      <div className="flex items-center justify-between">
        <Button type="button" onClick={onPrevPage} variant="secondary">
          Previous
        </Button>
        <Button type="submit" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </div>
  );
};
```

# src/components/RentalRequestForm/FormField.tsx

```tsx
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
```

# src/components/RentalRequestForm/ContactInfoForm.tsx

```tsx
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

  const handleNextPage = () => {
    const validationErrors = validateContactInfo(formData);
    if (Object.keys(validationErrors).length === 0) {
      onNextPage();
    } else {
      // Update errors state in parent component
      Object.entries(validationErrors).forEach(([field, error]) => {
        onChange(field as keyof RentalRequestFormData, formData[field as keyof RentalRequestFormData], error);
      });
    }
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
        <Button type="button" onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};
```

# src/components/RentalRequestForm/ConfirmationPage.tsx

```tsx
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
```

# src/components/ui/Select.tsx

```tsx
import * as React from "react"

import { cn } from "../../lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"

export { Select }
```

# src/components/ui/Input.tsx

```tsx
import * as React from "react"

import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

# src/components/ui/Checkbox.tsx

```tsx
// src/components/ui/checkbox.tsx

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "../../lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

# src/components/ui/Button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

