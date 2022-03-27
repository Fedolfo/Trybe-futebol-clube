// import { GenerateLeaderBoard } from '../interfaces/ILeaderBoad';
import Clubs from '../database/models/Club';
import Matchs from '../database/models/Match';

class LeaderboardService {
  private ClubModel = Clubs;

  private MatchModel = Matchs;

  // async generate() {

  // }

  // getMatchs() {
  //   return this.MatchService.getMatchs();
  // }
}

export default LeaderboardService;
