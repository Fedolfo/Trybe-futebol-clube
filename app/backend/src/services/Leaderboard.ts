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

  private static countPointsAway(match: IMatchScore[]) {
    return match.reduce((prev, curr) => {
      if (curr.goalsFavor < curr.goalsOwn) {
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

  private static countGoalsBalanceAway(match: IMatchScore[]) {
    return match.reduce((prev, curr) => prev + (curr.goalsOwn - curr.goalsFavor), 0);
  }

  private static sortLeaderBoard(leaderBoard: ILeaderBoadDTO[]) {
    return leaderBoard.sort((a, b) => {
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
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

  private static generateLeaderBoard(clubs: IClubMatchScore[], homeTeam?: boolean) {
    const leaderBoard = clubs.map(({ matchs, clubName }) => {
      const clubHistory: ILeaderBoadDTO = {
        name: clubName,
        totalPoints: homeTeam ? this.countPoints(matchs) : this.countPointsAway(matchs),
        totalGames: matchs.length,
        totalVictories: homeTeam ? this.countVictories(matchs) : this.countLosses(matchs),
        totalDraws: this.countDraws(matchs),
        totalLosses: homeTeam ? this.countLosses(matchs) : this.countVictories(matchs),
        goalsFavor: homeTeam ? this.countGoalsFavor(matchs) : this.countGoalsOwn(matchs),
        goalsOwn: homeTeam ? this.countGoalsOwn(matchs) : this.countGoalsFavor(matchs),
        goalsBalance: homeTeam
          ? this.countGoalsBalance(matchs) : this.countGoalsBalanceAway(matchs),
        efficiency: 0,
      };

      clubHistory.efficiency = +((clubHistory.totalPoints / (matchs.length * 3)) * 100).toFixed(2);
      return clubHistory;
    });
    return this.sortLeaderBoard(leaderBoard);
  }

  async getHomeMatchs(homeTeam?: boolean) {
    const homeMatchsClub = (await this.Clubs.findAll({
      include: [{
        model: this.Matchs,
        as: 'homeMatchs',
        where: {
          inProgress: false,
        },
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      }],
    }));

    const MatchHomeHistory = homeMatchsClub.map((home) => {
      const clubs = home.get({ plain: true });
      const matchs = [...clubs.homeMatchs];
      delete Object.assign(clubs, { matchs }).homeMatchs;
      return clubs;
    });
    return LeaderboardService.generateLeaderBoard(MatchHomeHistory, homeTeam);
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
    }));
    const MatchHomeHistory = homeAwayClub.map((home) => {
      const clubs = home.get({ plain: true });
      const matchs = [...clubs.awayMatchs];
      delete Object.assign(clubs, { matchs }).awayMatchs;
      return clubs;
    });
    return LeaderboardService.generateLeaderBoard(MatchHomeHistory);
  }

  async getAllMatchs() {
    const homeMatchsClub = (await this.Clubs.findAll({
      include: [{
        model: this.Matchs,
        as: 'homeMatchs',
        where: { inProgress: false },
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      },
      {
        model: this.Matchs,
        as: 'awayMatchs',
        where: { inProgress: false },
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      },
      ],
    }));

    return homeMatchsClub;
  }

  async leaderBoardRank() {
    const getAllMatchs = await this.getAllMatchs();
    const MatchHomeHistory = getAllMatchs.map((home) => {
      const clubs = home.get({ plain: true });
      const matchs = [...clubs.homeMatchs, ...clubs.awayMatchs];
      delete Object.assign(clubs, { matchs }).homeMatchs;
      delete Object.assign(clubs, { matchs }).awayMatchs;
      return clubs;
    });

    return LeaderboardService.generateLeaderBoard(MatchHomeHistory);
  }
}

export default LeaderboardService;
