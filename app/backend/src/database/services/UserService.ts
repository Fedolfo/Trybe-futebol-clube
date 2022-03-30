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

  if (!userMail || userMail.password !== password) {
    const error = new Error();
    error.message = 'Invalid fields';
    error.name = 'EmailReq';
    throw error;
  }
  const { id } = userMail;
  const token = jwt.sign({ id });

  return token;
};

export {
  getByMail,
  login,
};
