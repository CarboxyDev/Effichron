import { z } from 'zod';

// validSchema is the schema against which the body is checked
export function isValidBody(body: any, validSchema: z.ZodObject<any>) {
  type Body = z.infer<typeof validSchema>;
  const isValid = validSchema.safeParse(body).success;
  return isValid;
}
