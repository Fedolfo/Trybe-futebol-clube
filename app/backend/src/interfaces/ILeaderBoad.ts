import { IClub } from './IClub';

export interface ILeaderBoadDTO {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

// export interface IMatchScore {
//   goalsFavor: number;
//   goalsOwn: number;
// }

export interface IClubMatchScore {
  goalsFavor: number;
  goalsOwn: number;
  matchs: IClubMatchScore[];
}

export interface IClubMatchHomeScore extends IClub{
  homeMatchs: IClubMatchScore[];
}
