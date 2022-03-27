import { IClub } from '../interfaces/IClub';
import Clubs from '../database/models/Club';

class ClubService {
  private Clubs = Clubs;

  async getClubs() {
    const clubs: IClub[] = await this.Clubs.findAll();
    return clubs;
  }

  async getByIdClub(id: number) {
    const club: IClub | null = await this.Clubs.findByPk(id);
    return club;
  }
}

export default ClubService;
