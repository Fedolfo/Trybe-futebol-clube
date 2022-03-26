import { Request, Response } from 'express';
import { ILoginEmailAndPasswordDTO } from '../interfaces/ILogin';
import { LoginService } from '../services';

class LoginController {
  private LoginService: LoginService;

  constructor() {
    this.LoginService = new LoginService();
    this.getLogin = this.getLogin.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async getLogin(req: Request, res: Response) {
    const input: ILoginEmailAndPasswordDTO = req.body;
    const login = await this.LoginService.getLogin(input);

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

export default LoginController;
