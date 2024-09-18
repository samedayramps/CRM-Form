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
    console.log('Submitting form data:', formData); // Add this line
    const response: AxiosResponse<RentalRequestResponse> = await api.post('/api/rental-requests', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting rental request:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server response:', error.response.data); // Add this line
    }
    throw error;
  }
};
export default api;
