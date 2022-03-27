import * as cors from 'cors';
import * as express from 'express';
import debug from 'debug';
import { ClubRoutes, LoginRoutes, MatchRoutes } from './routes';
import DomainError from './middlewares/domainError';

require('express-async-errors');

class App {
  public app: express.Application = express();

  public debugLog: debug.IDebugger = debug('app');

  constructor() {
    this.config();
    this.routesConfig();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT, PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(DomainError.errorMiddleware);
  }

  routesConfig() {
    this.app.use(new LoginRoutes().router);
    this.app.use(new MatchRoutes().router);
    this.app.use(new ClubRoutes().router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log('iniciado porta:', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
