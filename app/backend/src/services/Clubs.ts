import { IClub } from '../interfaces/IClub';
import Clubs from '../database/models/Club';

class ClubService {
  private ClubModel = Clubs;

  async getClubs() {
    const clubs: IClub[] = await this.ClubModel.findAll();
    return clubs;
  }

  async getByIdClub(id: number) {
    const club: IClub | null = await this.ClubModel.findByPk(id);
    return club;
  }
}

export default new ClubService();
