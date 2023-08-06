import { DELETE_TASK } from './delete';
import { GET_TASK } from './get';
import { POST_TASK } from './post';
import { PUT_TASK } from './put';

/*
 ** POST     -> Create a new task
 ** GET      -> Get one or all tasks
 ** DELETE   -> Delete a task
 ** PUT      -> Update/Edit a task
 */

export async function POST(req: Request, res: Response) {
  return POST_TASK(req, res);
}

export async function GET(req: Request, res: Response) {
  return GET_TASK(req, res);
}

export async function DELETE(req: Request, res: Response) {
  return DELETE_TASK(req, res);
}

export async function PUT(req: Request, res: Response) {
  return PUT_TASK(req, res);
}
