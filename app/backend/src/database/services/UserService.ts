import User from '../models/user';

const FindOne = async (email: string) => {
  const dbEmail = await User.findOne({ where: { email } });
  if (!dbEmail) {
    return null;
  }
  return dbEmail;
};

export default FindOne;
