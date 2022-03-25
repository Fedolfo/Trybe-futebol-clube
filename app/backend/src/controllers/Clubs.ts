import { Request, Response } from 'express';
import { ClubService } from '../services';

class ClubsController {
  static async getClubs(_req: Request, res: Response) {
    const clubs = await ClubService.getClubs();
    res.status(200).json(clubs);
  }

  static async getByIdClub(req: Request, res: Response) {
    const { id } = req.params;
    const club = await ClubService.getByIdClub(Number(id));
    res.status(200).json(club);
  }
}

export default ClubsController;
