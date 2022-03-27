import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

class LeaderBoardController {
  private LeaderboardService: LeaderboardService;

  constructor() {
    this.LeaderboardService = new LeaderboardService();
    this.getHomeTeamMatchs = this.getHomeTeamMatchs.bind(this);
    this.getAwayTeamMatchs = this.getAwayTeamMatchs.bind(this);
  }

  async getHomeTeamMatchs(_req: Request, res: Response) {
    const result = await this.LeaderboardService.getHomeMatchs();
    res.status(200).json(result);
  }

  async getAwayTeamMatchs(_req: Request, res: Response) {
    const result = await this.LeaderboardService.getAwayMatchs();
    res.status(200).json(result);
  }
}

export default LeaderBoardController;
