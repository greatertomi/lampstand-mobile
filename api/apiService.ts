/* eslint-disable unicorn/no-useless-promise-resolve-reject */
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { SWRConfiguration } from 'swr';

import { getLocalStorageItem, logger } from '../utils';

import { endpoints } from './endpoint';

export const swrConfig: SWRConfiguration = {
  dedupingInterval: 10_000,
  shouldRetryOnError: false,
  revalidateOnFocus: true,
  revalidateOnReconnect: true
};

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
    this.api.interceptors.response.use(this.responseInterceptor, this.responseErrorHAndler);
  }

  private static exemptEndpoints = [endpoints.signup, endpoints.login];

  private static requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    try {
      const isExempt = ApiService.exemptEndpoints.some((endpoint) => config.url?.includes(endpoint) || false);

      if (!isExempt) {
        const authToken = await getLocalStorageItem('token');
        if (!authToken) {
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

  private static requestErrorHandler = async (error: AxiosError) => Promise.reject(error);

  private responseInterceptor = async (response: AxiosResponse) => {
    this.resetErrorCount();
    return response;
  };

  private responseErrorHAndler = async (error: AxiosError) => {
    if (this.isBlocked) {
      return Promise.reject(new Error('Too many failed requests. API requests blocked.'));
    }
    this.consecutiveErrors += 1;

    if (this.consecutiveErrors >= this.MAX_ERRORS) {
      this.isBlocked = true;
      return Promise.reject(new Error('Too many errors, API requests stopped.'));
    }
    logger.error('Response error:', error);
    return Promise.reject(error);
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
