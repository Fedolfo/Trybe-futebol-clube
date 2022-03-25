// import User from '../models/user';
// import UserInterface from './UsersInterfaces';

// class UserService {
//   private user: UserInterface;

//   constructor() {
//     this.user = {
//       id: 0,
//       username: 'string',
//       role: 'string';
//       email: string;
//       password: number;
//     };
//   }

//   public async FindOne(user: UserInterface) {
//     const dbEmail = await User.findOne({ where: user.email });
//     if (!dbEmail) {
//       return null;
//     }
//     this.user.email = dbEmail.dataValues.email;
//     return dbEmail.dataValues.email;
//   }
// }

// export default UserService;
