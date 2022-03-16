import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {
  declare id: number;

  declare username: string;

  declare role: string;

  declare email: string | boolean;

  declare password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, timestamps: false, modelName: 'user' });
