import { getByMail } from '../services/UserService';

const getUserByMail = async (email: string) => {
  const user = await getByMail(email);
  return user;
};

export default getUserByMail;
