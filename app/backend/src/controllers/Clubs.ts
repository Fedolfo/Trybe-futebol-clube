import { Request, Response } from 'express';
import { ClubService } from '../services';

class ClubsController {
  private ClubService = ClubService;

  async getClubs(_req: Request, res: Response) {
    const clubs = await this.ClubService.getClubs();
    res.status(200).json(clubs);
  }

  async getByIdClub(req: Request, res: Response) {
    const { id } = req.params;
    const club = await this.ClubService.getByIdClub(Number(id));
    res.status(200).json(club);
  }
}

export default ClubsController;
