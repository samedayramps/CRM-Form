export interface RentalRequestFormData {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  rampDetails: {
    knowRampLength: boolean;
    rampLength?: number;
    knowRentalDuration: boolean;
    rentalDuration?: number;
    installTimeframe: '' | 'Within 24 hours' | 'Within 2 days' | 'Within 3 days' | 'Within 1 week' | 'Over 1 week';
    mobilityAids: string[];
  };
  installAddress: string;
}

export interface FormErrors {
  customerInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  rampDetails?: {
    knowRampLength?: string;
    rampLength?: string;
    knowRentalDuration?: string;
    rentalDuration?: string;
    installTimeframe?: string;
    mobilityAids?: string;
  };
  installAddress?: string;
}

export type FormChangeHandler = (
  field: string,
  value: string | string[] | boolean | number,
  error?: string
) => void;