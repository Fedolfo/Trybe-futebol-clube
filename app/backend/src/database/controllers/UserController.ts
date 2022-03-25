import { Request, Response } from 'express';
import FindOne from '../services/UserService';

const FindOneUser = async (req: Request, res: Response) => {
  const user = await FindOne(req.body.email);
  return res.status(200).json(user);
};

export default FindOneUser;
