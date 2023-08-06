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

// validSchema is the schema against which the body is checked
export function isValidBody(body: any, validSchema: z.ZodObject<any>) {
  type Body = z.infer<typeof validSchema>;
  const isValid = validSchema.safeParse(body).success;
  return isValid;
}
