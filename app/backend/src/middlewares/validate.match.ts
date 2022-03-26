import { NextFunction, Request, Response } from 'express';
import { ClubService } from '../services';

export default class ValidateTeam {
  private ClubService: ClubService;

  constructor() {
    this.ClubService = new ClubService();
    this.validate = this.validate.bind(this);
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    const idHomeTeam = await this.ClubService.getByIdClub(homeTeam);
    const idAwayTeam = await this.ClubService.getByIdClub(awayTeam);

    if (idHomeTeam?.id === idAwayTeam?.id) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!idHomeTeam || !idAwayTeam) {
      return res.status(401).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
