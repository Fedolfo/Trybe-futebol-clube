import { Request, Response } from 'express';

import { MatchService } from '../services';

class MatchController {
  private MatchService: MatchService;

  constructor() {
    this.MatchService = new MatchService();
    this.getMatchs = this.getMatchs.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.matchInsertedProgress = this.matchInsertedProgress.bind(this);
    this.updateGoalsInMatch = this.updateGoalsInMatch.bind(this);
  }

  async getMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matchs = await this.MatchService.getMatchs(inProgress as string);
    res.status(200).json(matchs);
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;

    const match = await this.MatchService
      .createMatch({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });

    res.status(201).json(match);
  }

  async matchInsertedProgress(req: Request, res: Response) {
    const { id } = req.params;

    const resultProgress = await this.MatchService.matchInsertedProgress(Number(id));

    if (resultProgress) {
      res.status(200).json({ message: 'OK' });
    }
  }

  async updateGoalsInMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.MatchService.updateGoalsInMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );

    res.status(200).json({ message: 'result goals updated' });
  }
}

export default MatchController;
