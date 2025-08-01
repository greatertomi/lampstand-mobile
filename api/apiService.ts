import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { getLocalStorageItem, logger } from '../utils';

import { endpoints } from './endpoint';

class ApiService {
  private readonly api: AxiosInstance;

  private consecutiveErrors = 0;

  private readonly MAX_ERRORS = 5;

  private isBlocked = false;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.api.interceptors.request.use(ApiService.requestInterceptor, ApiService.requestErrorHandler);
    this.api.interceptors.response.use(this.responseInterceptor, this.responseErrorHandler);
  }

  private static exemptEndpoints = [
    endpoints.signup,
    endpoints.login,
    endpoints.resetPassword,
    endpoints.verifyResetToken,
    endpoints.updatePassword,
    endpoints.googleOauth
  ];

  private static requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    try {
      const isExempt = ApiService.exemptEndpoints.some((endpoint) => config.url?.includes(endpoint) || false);
      logger.debug('request', `${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);

      if (!isExempt) {
        const authToken = await getLocalStorageItem('token');
        if (!authToken) {
          // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
          return Promise.reject(new Error('User not logged in. Request blocked.'));
        }
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      if (config.data instanceof FormData) {
        // eslint-disable-next-line no-param-reassign
        config.headers['Content-Type'] = 'multipart/form-data';
      }
    } catch (error) {
      logger.error('Error retrieving auth token:', error);
    }
    return config;
  };

  private static requestErrorHandler = async (error: AxiosError) => {
    throw error;
  };

  private responseInterceptor = async (response: AxiosResponse) => {
    this.resetErrorCount();
    return response;
  };

  private responseErrorHandler = async (error: AxiosError) => {
    const isExempt = ApiService.exemptEndpoints.some((endpoint) => error.config?.url?.includes(endpoint));
    if (isExempt) {
      this.resetErrorCount();
    }

    if (this.isBlocked) {
      throw new Error('Too many failed requests. API requests blocked.');
    }
    this.consecutiveErrors += 1;

    if (this.consecutiveErrors >= this.MAX_ERRORS) {
      this.isBlocked = true;
      throw new Error('Too many errors, API requests stopped.');
    }
    logger.error('Response error:', error);
    throw error;
  };

  public resetErrorCount() {
    this.consecutiveErrors = 0;
    this.isBlocked = false;
  }

  public get instance() {
    return this.api;
  }
}

export const apiService = new ApiService().instance;
