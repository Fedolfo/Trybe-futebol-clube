import * as express from 'express';
import { validateTeam } from '../middlewares/validate.match';
import validateJWT from '../auth/validateJWT';
import { MatchController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class MatchRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MatchRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/matchs').get(MatchController.getMatchs);

    this.app.route('/matchs').post(validateTeam, MatchController.createMatch);

    this.app.route('/matchs/:id').patch(MatchController.updateGoalsInMatch);

    this.app.route('/matchs/:id/finish').patch(
      validateJWT,
      MatchController.matchInsertedProgress,
    );

    return this.app;
  }
}

export default MatchRoutes;
