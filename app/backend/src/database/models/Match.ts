import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Club';

class Matchs extends Model {
  declare id: number;

  declare homeTeam: number;

  declare homeTeamGoals: number;

  declare awayTeam: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, { sequelize: db, timestamps: false, modelName: 'matchs', underscored: true });

Clubs.hasOne(Matchs, {
  foreignKey: 'homeTeam',
  as: 'homeMatchs',
});

Clubs.hasOne(Matchs, {
  foreignKey: 'awayTeam',
  as: 'awayMatchs',
});

Matchs.belongsTo(Clubs, {
  foreignKey: 'homeTeam',
  as: 'homeClub',
});

Matchs.belongsTo(Clubs, {
  foreignKey: 'awayTeam',
  as: 'awayClub',
});

export default Matchs;
