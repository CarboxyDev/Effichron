export interface StatusCode {}

export const SendResponse = (message: String, status: number) => {
  return new Response(JSON.stringify(message), { status: status });
};
