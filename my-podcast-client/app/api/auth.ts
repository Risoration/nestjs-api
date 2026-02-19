import { apiClient } from '../lib/axios';
import { setCookie } from '../lib/cookie';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterDto) => {
  const response = await apiClient.post('/auth/register', data);

  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', data);
  setCookie('accessToken', response.data.accessToken, 30);

  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/users/me');

  return response.data;
};
