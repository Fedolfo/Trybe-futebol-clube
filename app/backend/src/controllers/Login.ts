import { Request, Response } from 'express';
import { LoginService } from '../services';

class LoginController {
  private LoginService = LoginService;

  async getLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const login = await this.LoginService.getLogin({ email, password });

    if (login.message) {
      return res.status(login.code).json({ message: login.message });
    }

    res.status(200).json(login);
  }

  async getUser(_req: Request, res: Response) {
    const user = await this.LoginService.getUser();
    res.status(200).json(user);
  }
}

export default new LoginController();
