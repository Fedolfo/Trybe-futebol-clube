import { IMatchsDTO, IMatchBody } from '../interfaces/IMatchs';
import Clubs from '../database/models/Club';
import Matchs from '../database/models/Match';

class MatchService {
  static async getMatchs(inProgress?: string) {
    const matchs = await Matchs.findAll({
      include: [
        { model: Clubs,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        { model: Clubs,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ],
    }) as unknown as IMatchsDTO[];

    if (inProgress) {
      return matchs.filter((match) => String(match.inProgress) === inProgress);
    }

    return matchs;
  }

  static async createMatch(match: IMatchBody) {
    return Matchs.create(match);
  }

  static async matchInsertedProgress(id: number) {
    return Matchs.update({ inProgress: false }, { where: { id } });
  }

  static async updateGoalsInMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    return Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}

export default MatchService;
