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
  
  export type FormChangeHandler = (name: keyof RentalRequestFormData, value: string | string[]) => void;