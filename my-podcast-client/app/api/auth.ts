import { apiClient } from '../lib/axios';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterDto) {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
}

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};
