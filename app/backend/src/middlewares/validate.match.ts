import { NextFunction, Request, Response } from 'express';
import { ClubService } from '../services';

const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const idHomeTeam = await ClubService.getByIdClub(homeTeam);
  const idAwayTeam = await ClubService.getByIdClub(awayTeam);

  if (idHomeTeam?.id === idAwayTeam?.id) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (!idHomeTeam || !idAwayTeam) {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateTeam;
