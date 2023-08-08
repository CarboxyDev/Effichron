import { AxiosError } from 'axios';

// FIXME: Check the issues.txt, temporary fix has been put in place
export const getErrorMessage = (error: Error): string => {
  if (error instanceof AxiosError && error.response) {
    if (error.response.data.length > 50) {
      return "An error occurred. That's about all we know.";
    }
    return error.response.data;
  }
  if (error.message) {
    return error.message;
  }

  return "An error occurred. That's about all we know.";
};

export const SendResponse = (message: String, status: number) => {
  return new Response(JSON.stringify(message), { status: status });
};
