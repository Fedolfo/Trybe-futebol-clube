interface IIDMatch {
  id: number;
}

export interface IMatchBody {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchsDTO extends IIDMatch, IMatchBody {
  homeClub: {
    clubName: string;
  }
  awayClub: {
    clubName: string;
  }
}
