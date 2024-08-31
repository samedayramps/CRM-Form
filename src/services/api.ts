import axios, { AxiosInstance, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://samedayramps-016e8e090b17.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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

export interface RentalRequestResponse {
  message: string;
  customerId: string;
  jobId: string;
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