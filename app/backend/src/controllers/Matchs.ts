import { Request, Response } from 'express';
import { ClubService } from '../services';
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

    const idHomeTeam = await ClubService.getByIdClub(match.homeTeam);
    const idAwayTeam = await ClubService.getByIdClub(match.awayTeam);
    const CLUB_A = idHomeTeam?.getDataValue('id') as number;
    const CLUB_B = idAwayTeam?.getDataValue('id') as number;

    if (!CLUB_A || !CLUB_B) {
      return res.status(401).json({ message: 'Team not found' });
    }

    if (CLUB_A === CLUB_B) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    res.status(201).json(match);
  }

  static async matchInsertedProgress(req: Request, res: Response) {
    const { id } = req.params;
    // const { inProgress } = req.body;

    const match = await MatchService.matchInsertedProgress(Number(id));

    res.status(200).json(match);
  }
}

export default MatchController;
