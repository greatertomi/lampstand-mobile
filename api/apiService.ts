import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getLocalStorageItem, logger } from '../utils';

export const apiService: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiService.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      const authToken = await getLocalStorageItem('token');
      if (authToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.authorization = `Bearer ${authToken}`;
      }
    } catch (error) {
      logger.error('Error retrieving auth token:', error);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    logger.error('Response error:', error);
    return Promise.reject(error);
  }
);
