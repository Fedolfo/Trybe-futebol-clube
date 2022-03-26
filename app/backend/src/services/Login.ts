import { ILoginEmailAndPasswordDTO, Ilogin } from '../interfaces/ILogin';
import User from '../database/models/User';
import compare from '../utils/Bcrypt';
import Token from '../auth/createTokenJWT';

class LoginService {
  private User = User;

  async getLogin(value: ILoginEmailAndPasswordDTO) {
    const { email, password } = value;
    const searchUser: Ilogin | null = await this.User.findOne({ where: { email } });

    if (!searchUser) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const comparePassword = await compare(password, searchUser.password);

    if (!comparePassword) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const token = Token.createToken(searchUser.email);

    const { id, username, role } = searchUser;
    return { user: { id, username, role, email }, token };
  }

  async getUser() {
    const getUser: Ilogin[] = await this.User.findAll();
    return getUser[0].role;
  }
}

export default new LoginService();
