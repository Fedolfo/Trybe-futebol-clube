import * as express from 'express';

export default abstract class CommonRoutesConfig {
  router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  abstract configureRoutes(): void;
}
