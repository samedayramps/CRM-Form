import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RentalRequestFormData } from '../components/RentalRequestForm/types';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://app.samedayramps.com',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  timeout: 10000,
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
    console.log('Submitting form data:', formData);
    const response: AxiosResponse<RentalRequestResponse> = await api.post('/api/rental-requests', formData);
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting rental request:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Server error response:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      console.error('Error config:', error.config);
    }
    throw error;
  }
};

// Add an interceptor to log all requests
api.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

// Add an interceptor to log all responses
api.interceptors.response.use(
  response => {
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  },
  error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default api;