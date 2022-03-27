import { ILeaderBoadDTO,
  IClubMatchScore, IClubMatchHomeScore } from '../interfaces/ILeaderBoad';
import Clubs from '../database/models/Club';
import Matchs from '../database/models/Match';

class LeaderboardService {
  private Clubs = Clubs;

  private Matchs = Matchs;

  private static countPoints(match: IClubMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor > curr.goalsOwn) {
        return prev + 3;
      }
      if (curr.goalsFavor === curr.goalsOwn) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  private static countVictories(match: IClubMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor > curr.goalsOwn) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  private static countDraws(match: IClubMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor === curr.goalsOwn) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  private static countLosses(match: IClubMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor < curr.goalsOwn) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  private static countGoalsFavor(match: IClubMatchScore[]) {
    return match.reduce((prev, curr) => prev + curr.goalsFavor, 0);
  }

  private static countGoalsOwn(match: IClubMatchScore[]) {
    return match.reduce((prev, curr) => prev + curr.goalsOwn, 0);
  }

  private static countGoalsBalance(match: IClubMatchScore[]) {
    return match.reduce((prev, curr) => prev + (curr.goalsFavor - curr.goalsOwn), 0);
  }

  private static sortLeaderBoard(leaderBoard: ILeaderBoadDTO[]) {
    return leaderBoard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        return b.totalGames - a.totalGames;
      }
      return b.totalPoints - a.totalPoints;
    });
  }

  private static async generateLeaderBoard(clubs: IClubMatchScore[], name: string) {
    const leaderBoard = clubs.map(({ matchs }) => {
      const clubHistory = {
        name,
        totalPoints: this.countPoints(matchs),
        totalGames: matchs.length,
        totalVictores: this.countVictories(matchs),
        totalDraws: this.countDraws(matchs),
        totalLosses: this.countLosses(matchs),
        goalsFavor: this.countGoalsFavor(matchs),
        goalsOwn: this.countGoalsOwn(matchs),
        goalsBalance: this.countGoalsBalance(matchs),
        efficiency: 0,
      } as unknown as ILeaderBoadDTO;
      clubHistory.efficiency = +((clubHistory.totalPoints / (matchs.length * 3)) * 100).toFixed(2);
      return clubHistory;
    });
    return (leaderBoard);
  }

  async getHomeMatchs() {
    const homeMatchs = (await this.Clubs.findAll({
      include: [{
        model: this.Matchs,
        as: 'homeMatchs',
        where: {
          inProgress: false,
        },
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      }],
    })) as unknown as IClubMatchHomeScore[];
    const MatchHomeHistory = homeMatchs.map((home) => LeaderboardService
      .generateLeaderBoard(home.homeMatchs, home.clubName));
    return MatchHomeHistory;
  }
}

export default LeaderboardService;
