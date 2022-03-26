import { IMatchs, IMatchBodyDTO } from '../interfaces/IMatchs';
import Clubs from '../database/models/Club';
import Matchs from '../database/models/Match';

class MatchService {
  private Matchs = Matchs;

  private Clubs = Clubs;

  async getMatchs(inProgress?: string) {
    const matchs = await this.Matchs.findAll({
      include: [
        { model: this.Clubs,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        { model: this.Clubs,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ],
    }) as unknown as IMatchs[];

    if (inProgress) {
      return matchs.filter((match) => String(match.inProgress) === inProgress);
    }

    return matchs;
  }

  async createMatch(match: IMatchBodyDTO) {
    return this.Matchs.create(match) as unknown as IMatchs;
  }

  async matchInsertedProgress(id: number) {
    return this.Matchs.update({ inProgress: false }, { where: { id } }) as unknown as IMatchs;
  }

  async updateGoalsInMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    return this.Matchs.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    ) as unknown as IMatchs;
  }
}

export default MatchService;
