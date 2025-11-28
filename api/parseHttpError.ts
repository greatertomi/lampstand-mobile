import { AxiosError, HttpStatusCode } from 'axios';

type HttpError = {
  errors: { message: string; field?: string }[];
};

type ParseHttpErrorResponse = {
  message: string;
  statusCode: HttpStatusCode;
};

const isAxiosError = (error: unknown): error is AxiosError => (error as AxiosError).isAxiosError !== undefined;

const handleNetworkError = (error: AxiosError): ParseHttpErrorResponse | null => {
  if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
    return {
      message: 'Unable to connect to the server. Please check your connection and try again.',
      statusCode: HttpStatusCode.ServiceUnavailable
    };
  }

  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    return {
      message: 'Request timed out. Please check your internet connection and try again.',
      statusCode: HttpStatusCode.RequestTimeout
    };
  }

  return {
    message: 'Network error occurred. Please check your connection and try again.',
    statusCode: HttpStatusCode.ServiceUnavailable
  };
};

const handleResponseError = (error: AxiosError): ParseHttpErrorResponse => {
  const errorData = (error.response!.data as HttpError)?.errors;
  const statusCode = error.response!.status as HttpStatusCode;

  if (!errorData || errorData.length === 0) {
    return {
      message: error.response!.statusText || 'An error occurred while processing your request',
      statusCode
    };
  }

  if (errorData.length === 1) {
    return {
      message: errorData[0].message,
      statusCode
    };
  }

  return {
    message: errorData.map((err) => err.message).join(', '),
    statusCode
  };
};

export const parseHttpError = (error: unknown): ParseHttpErrorResponse => {
  if (isAxiosError(error)) {
    if (!error.response) {
      return handleNetworkError(error) as ParseHttpErrorResponse;
    }

    return handleResponseError(error);
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    statusCode: HttpStatusCode.InternalServerError
  };
};
