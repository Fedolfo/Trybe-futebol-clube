import { IClub } from './IClub';

interface IIDMatchDTO {
  id: number;
}

export interface IMatchBodyDTO {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchs extends IIDMatchDTO, IMatchBodyDTO {
  homeClub: IClub
  awayClub: IClub
}
