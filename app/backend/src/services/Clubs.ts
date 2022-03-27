import { IClub } from '../interfaces/IClub';
import Clubs from '../database/models/Club';

class ClubService {
  private Clubs = Clubs;

  async getClubs(): Promise<IClub[]> {
    const clubs = await this.Clubs.findAll();
    return clubs.map((club) => club.get({ plain: true }));
  }

  async getByIdClub(id: number): Promise<IClub | null> {
    const clubId = await this.Clubs.findByPk(id);
    return clubId ? clubId.get({ plain: true }) : null;
  }
}

export default ClubService;
