import { Model, DataTypes } from 'sequelize';
import db from '.';
import Club from './club';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Club.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match' });
Club.belongsTo(Match, { foreignKey: 'awayTeam', as: 'Match' });

Match.hasMany(Club, { foreignKey: 'homeTeam', as: 'club' });
Match.hasMany(Club, { foreignKey: 'awayTeam', as: 'Club' });

export default Match;
