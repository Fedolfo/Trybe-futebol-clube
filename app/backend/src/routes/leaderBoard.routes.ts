import { LeaderBoardController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class LeaderBoardRoutes extends CommonRoutesConfig {
  private LeaderBoardController: LeaderBoardController;

  constructor() {
    super();
    this.LeaderBoardController = new LeaderBoardController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/leaderboard/home', this.LeaderBoardController.getHomeTeamMatchs);
    this.router.get('/leaderboard/away', this.LeaderBoardController.getAwayTeamMatchs);
    this.router.get('/leaderboard', this.LeaderBoardController.getLeaderboardRank);
  }
}

export default LeaderBoardRoutes;
