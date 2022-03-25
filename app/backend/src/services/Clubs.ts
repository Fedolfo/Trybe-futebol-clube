import Clubs from '../database/models/Club';

class ClubService {
  static async getClubs() {
    const clubs = await Clubs.findAll();
    return clubs;
  }

  static async getByIdClub(id: number) {
    const club = await Clubs.findByPk(id);
    return club;
  }
}

export default ClubService;
