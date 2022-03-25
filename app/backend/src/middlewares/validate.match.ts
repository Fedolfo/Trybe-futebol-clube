import { NextFunction, Request, Response } from 'express';
import { ClubService } from '../services';

export const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const idHomeTeam = await ClubService.getByIdClub(homeTeam);
  const idAwayTeam = await ClubService.getByIdClub(awayTeam);
  const CLUB_A = idHomeTeam?.getDataValue('id') as number;
  const CLUB_B = idAwayTeam?.getDataValue('id') as number;

  if (CLUB_A === CLUB_B) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (!CLUB_A || !CLUB_B) {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }

  next();
};

export const a = async (req: Request, res: Response, next: NextFunction) => {
  next();
};
