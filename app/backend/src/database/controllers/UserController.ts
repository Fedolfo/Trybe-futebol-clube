import { getByMail, login } from '../services/UserService';

const getUserByMail = async (email: string) => {
  const user = await getByMail(email);
  return user;
};

const loginServ = async (email: string, password:string) => {
  const user = await login(email, password);
  return user;
};

export {
  getUserByMail,
  loginServ,
};
