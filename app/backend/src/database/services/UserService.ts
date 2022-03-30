import User from '../models/user';

const getByMail = async (email: string) => {
  const userBymail = await User.findOne({ where: { email } });
  if (!userBymail) {
    return null;
  }
  return userBymail;
};

export default getByMail;
