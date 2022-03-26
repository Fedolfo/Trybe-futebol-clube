import { Request, Response } from 'express';
import { Leaderboard } from '../services';

class LeaderBoardController {
  static async getTeam(_req: Request, res: Response) {
    const team = await Leaderboard.Team;
    res.status(200).json(team);
  }
}

export default LeaderBoardController;
