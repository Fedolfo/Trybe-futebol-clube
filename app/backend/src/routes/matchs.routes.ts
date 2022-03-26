import ValidateTeam from '../middlewares/validate.match';
import validateJWT from '../auth/validateJWT';
import { MatchController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class MatchRoutes extends CommonRoutesConfig {
  private MatchController: MatchController;

  private ValidateTeam: ValidateTeam;

  constructor() {
    super();
    this.MatchController = new MatchController();
    this.ValidateTeam = new ValidateTeam();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/matchs', this.MatchController.getMatchs);

    this.router.post('/matchs', this.ValidateTeam.validate, this.MatchController.createMatch);

    this.router.patch('/matchs/:id', this.MatchController.updateGoalsInMatch);

    this.router.patch(
      '/matchs/:id/finish',
      validateJWT,
      this.MatchController.matchInsertedProgress,
    );
  }
}

export default MatchRoutes;
