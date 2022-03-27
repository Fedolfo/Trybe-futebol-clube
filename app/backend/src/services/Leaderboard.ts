import { ILeaderBoadDTO,
  IMatchScore, IClubMatchScore } from '../interfaces/ILeaderBoad';
import Clubs from '../database/models/Club';
import Matchs from '../database/models/Match';

class LeaderboardService {
  private Clubs = Clubs;

  private Matchs = Matchs;

  private static countPoints(match: IMatchScore[]) {
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

  private static countVictories(match: IMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor > curr.goalsOwn) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  private static countDraws(match: IMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor === curr.goalsOwn) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  private static countLosses(match: IMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor < curr.goalsOwn) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  private static countGoalsFavor(match: IMatchScore[]) {
    return match.reduce((prev, curr) => prev + curr.goalsFavor, 0);
  }

  private static countGoalsOwn(match: IMatchScore[]) {
    return match.reduce((prev, curr) => prev + curr.goalsOwn, 0);
  }

  private static countGoalsBalance(match: IMatchScore[]) {
    return match.reduce((prev, curr) => prev + (curr.goalsFavor - curr.goalsOwn), 0);
  }

  private static sortLeaderBoard(leaderBoard: ILeaderBoadDTO[]) {
    return leaderBoard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
  }

  private static generateLeaderBoard(clubs: IClubMatchScore[]) {
    const leaderBoard = clubs.map(({ matchs, clubName }) => {
      const clubHistory: ILeaderBoadDTO = {
        name: clubName,
        totalPoints: this.countPoints(matchs),
        totalGames: matchs.length,
        totalVictories: this.countVictories(matchs),
        totalDraws: this.countDraws(matchs),
        totalLosses: this.countLosses(matchs),
        goalsFavor: this.countGoalsFavor(matchs),
        goalsOwn: this.countGoalsOwn(matchs),
        goalsBalance: this.countGoalsBalance(matchs),
        efficiency: 0,
      };
      clubHistory.efficiency = +((clubHistory.totalPoints / (matchs.length * 3)) * 100).toFixed(2);
      return clubHistory;
    });
    return this.sortLeaderBoard(leaderBoard);
  }

  async getHomeMatchs() {
    const homeMatchsClub = (await this.Clubs.findAll({
      include: [{
        model: this.Matchs,
        as: 'homeMatchs',
        where: {
          inProgress: false,
        },
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      }],
      nest: true,
    }));
    const MatchHomeHistory = homeMatchsClub.map((home) => {
      const clubs = home.get({ plain: true });
      const matchs = [...clubs.homeMatchs];
      delete Object.assign(clubs, { matchs }).homeMatchs;
      return clubs;
    });
    return LeaderboardService.generateLeaderBoard(MatchHomeHistory);
  }

  async getAwayMatchs() {
    const homeAwayClub = (await this.Clubs.findAll({
      include: [{
        model: this.Matchs,
        as: 'awayMatchs',
        where: {
          inProgress: false,
        },
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      }],
      nest: true,
    }));
    const MatchHomeHistory = homeAwayClub.map((home) => {
      const clubs = home.get({ plain: true });
      const matchs = [...clubs.awayMatchs];
      delete Object.assign(clubs, { matchs }).awayMatchs;
      return clubs;
    });
    return LeaderboardService.generateLeaderBoard(MatchHomeHistory);
  }
}

export default LeaderboardService;
