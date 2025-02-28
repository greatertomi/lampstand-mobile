import { AxiosError, HttpStatusCode } from 'axios';

type HttpError = {
  errors: { message: string; field?: string }[];
};

type ParseHttpErrorResponse = {
  message: string;
  statusCode: HttpStatusCode;
};

const isAxiosError = (error: unknown): error is AxiosError => (error as AxiosError).isAxiosError !== undefined;

export const parseHttpError = (error: unknown): ParseHttpErrorResponse => {
  if (isAxiosError(error)) {
    const errorData = (error.response?.data as HttpError).errors;
    const statusCode = error.response?.status as HttpStatusCode;

    // if (errorData.length === 1) {
    //   return {
    //     message: errorData[0].message,
    //     statusCode
    //   };
    // }

    if (errorData.length > 0) {
      return {
        message: errorData.length === 1 ? errorData[0].message : errorData.map((err) => err.message).join(', '),
        statusCode,
      };
    }

    return {
      message: errorData.map((err) => err.message).join(', '),
      statusCode
    };
  }

  return {
    message: 'An error occurred',
    statusCode: HttpStatusCode.InternalServerError
  };
};
