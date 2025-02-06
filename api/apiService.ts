import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { getLocalStorageItem, logger } from '../utils';

let consecutive401Errors = 0;

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
      if (config.data instanceof FormData) {
        // eslint-disable-next-line no-param-reassign
        config.headers['Content-Type'] = 'multipart/form-data';
      }
    } catch (error) {
      logger.error('Error retrieving auth token:', error);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    consecutive401Errors = 0;
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      consecutive401Errors += 1;
      if (consecutive401Errors >= 3) {
        return Promise.reject(new Error('Too many 401 errors, stopping requests.'));
      }
    } else {
      consecutive401Errors = 0;
    }
    logger.error('Response error:', error);
    return Promise.reject(error);
  }
);
