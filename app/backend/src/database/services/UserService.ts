import * as bcrypt from 'bcryptjs';
import User from '../models/user';
import jwt from '../controllers/jwt';

const getByMail = async (email: string) => {
  const userBymail = await User.findOne({ where: { email } });
  if (!userBymail) {
    return null;
  }
  return userBymail;
};

const login = async (email:string, password:string) => {
  const userMail = await User.findOne({ where: { email } });

  if (!userMail?.email) {
    throw new Error('Incorrect email or password');
  }
  // const passcrypt = await bcrypt.decodeBase64(userMail.password, 10);
  // console.log(passcrypt);
  const crypt = await bcrypt.compare(password, userMail.password);
  if (!crypt) {
    throw new Error('Incorrect email or password');
  }

  const { id, username, role } = userMail;
  const token = jwt.sign({ id });

  return { user: { id, username, role, email }, token };
};

export {
  getByMail,
  login,
};
