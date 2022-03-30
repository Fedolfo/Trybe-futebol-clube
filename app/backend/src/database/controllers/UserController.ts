import FindOne from '../services/UserService';

const FindOneUser = async (email: string) => {
  const user = await FindOne(email);
  return user;
};

export default FindOneUser;
