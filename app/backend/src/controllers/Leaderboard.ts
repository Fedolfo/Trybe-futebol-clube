// import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

class LeaderBoardController {
  private LeaderboardService: LeaderboardService;

  constructor() {
    this.LeaderboardService = new LeaderboardService();
    // this.getBoard = this.getBoard.bind(this);
  }

  // async getBoard(_req: Request, res: Response) {
  //   const result = await this.LeaderboardService.getBoard();
  //   res.status(200).json(result);
  // }
}

export default LeaderBoardController;
