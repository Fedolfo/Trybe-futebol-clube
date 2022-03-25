import * as express from 'express';
import validateJWT from '../auth/validateJWT';
import { MatchController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class MatchRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MatchRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/matchs')
      .get(MatchController.getMatchs);

    this.app
      .route('/matchs')
      .post(MatchController.createMatch);

    this.app
      .route('/matchs/:id/finished')
      .patch(
        validateJWT,
        MatchController.matchInsertedProgress,
      );

    return this.app;
  }
}

export default MatchRoutes;
