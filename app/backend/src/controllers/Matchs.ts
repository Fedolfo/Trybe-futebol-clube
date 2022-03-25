import { Request, Response } from 'express';

import MatchService from '../services/Matchs';

class MatchController {
  static async getMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matchs = await MatchService.getMatchs(inProgress as string);
    res.status(200).json(matchs);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;

    const match = await MatchService
      .createMatch({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });

    res.status(201).json(match);
  }

  static async matchInsertedProgress(req: Request, res: Response) {
    const { id } = req.params;

    const resultProgress = await MatchService.matchInsertedProgress(Number(id));

    if (resultProgress) {
      res.status(200).json({ message: 'OK' });
    }
  }
}

export default MatchController;
