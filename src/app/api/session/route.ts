import { GET_SESSION } from './get';
import { POST_SESSION } from './post';

export async function POST(req: Request, res: Response) {
  return POST_SESSION(req, res);
}

export async function GET(req: Request, res: Response) {
  return GET_SESSION(req, res);
}
