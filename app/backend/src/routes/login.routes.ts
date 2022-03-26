import validateLoginJoi from '../middlewares/validate.login.joi';
import validateJWT from '../auth/validateJWT';
import { LoginController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class LoginRoutes extends CommonRoutesConfig {
  private LoginController: LoginController;

  constructor() {
    super();
    this.LoginController = new LoginController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.post(
      '/login',
      validateLoginJoi,
      this.LoginController.getLogin,
    );

    this.router
      .get(
        '/login/validate',
        validateJWT,
        this.LoginController.getUser,
      );
  }
}

export default LoginRoutes;
