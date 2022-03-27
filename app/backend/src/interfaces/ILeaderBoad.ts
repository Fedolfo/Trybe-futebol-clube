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

export default class GenerateLeaderBoard implements ILeaderBoadDTO {
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

  constructor(name: string, totalGames: number) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = totalGames;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }
}
