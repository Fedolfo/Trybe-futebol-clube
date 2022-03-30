import { Request, Response, Router } from 'express';
import * as UserController from '../controllers/UserController';

const userRoute = Router();

userRoute.get('/users/email', async (req:Request, res:Response) => {
  const { email } = req.body;
  const result = await UserController.getUserByMail(email);
  res.status(200).json(result);
});

userRoute.post('/login', async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const result = await UserController.loginServ(email, password);
  console.log(result);
  res.status(200).json(result);
});

export default userRoute;
