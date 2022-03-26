import { Ilogin, ILoginEmailAndPasswordDTO } from '../interfaces/ILogin';
import User from '../database/models/User';
import compare from '../utils/Bcrypt';
import Token from '../auth/createTokenJWT';

class LoginService {
  private User = User;

  private compare = compare;

  private createToken = Token.createToken;

  async getLogin(value: ILoginEmailAndPasswordDTO) {
    const { email, password } = value;
    const searchUser: Ilogin | null = await this.User.findOne({ where: { email } });

    if (!searchUser) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const comparePassword = await this.compare(password, searchUser.password);

    if (!comparePassword) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const token = this.createToken(searchUser.email);

    const { id, username, role } = searchUser;
    return { user: { id, username, role, email }, token };
  }

  async getUser() {
    const getUser: Ilogin[] = await this.User.findAll();
    return getUser[0].role;
  }
}

export default LoginService;
