import { Request, Response, Router } from 'express';
import * as UserController from '../controllers/UserController';

const userRoute = Router();

userRoute.get('/users/email', async (req:Request, res:Response) => {
  const { email } = req.body;
  const result = await UserController.default(email);
  res.status(200).json(result);
});

export default userRoute;
