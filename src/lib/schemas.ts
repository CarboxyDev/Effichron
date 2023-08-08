/**
 * This file contains all the schemas used for zod validation inside api routes
 * This files must contain only zod objects and should not contain any raw typescript types
 */
import { z } from 'zod';

export const SessionSnapshotSchema = z.object({
  session: z.any(), //TODO: Change this to actual session schema
});

// ! This will only be a subset of the Task type as this schema just has the barebones of the task
// ! However, this might need to be updated in case of changes to the Task type
export const TaskSchema = z.object({
  name: z.string(),
  color: z.string(),
});

export const TaskStrictSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

// validSchema is the schema against which the body is checked
/**
 * This method is used to validate request bodies against zod objects (schemas)
 *  @param {any} body - The request body to be validated
 *  @param {z.ZodObject<any>} schema - The zod object against which the body is to be validated
 */
export const isValidBody = (body: any, schema: z.ZodObject<any>) => {
  type Body = z.infer<typeof schema>;
  const isValid = schema.safeParse(body).success;
  return isValid;
};
