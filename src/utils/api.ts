import { AxiosError } from 'axios';

export const getErrorMessage = (error: Error): string => {
  if (error instanceof AxiosError && error.response) {
    return error.response.data;
  }
  return "An error occurred. That's about all we know.";
};

export const SendResponse = (message: String, status: number) => {
  return new Response(JSON.stringify(message), { status: status });
};
