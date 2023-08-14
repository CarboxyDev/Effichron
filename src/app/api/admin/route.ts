import { GET_ADMIN } from './get';

export async function GET(req: Request, res: Response) {
  return GET_ADMIN(req, res);
}
