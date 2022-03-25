import * as cors from 'cors';
import * as express from 'express';
import debug from 'debug';
import CommonRoutesConfig from './routes/common.routes.config';
import { ClubRoutes, LoginRoutes, MatchRoutes } from './routes';
import DomainError from './middlewares/domainError';

require('express-async-errors');

class App {
  public app: express.Application = express();

  public routes: Array<CommonRoutesConfig> = [];

  public debugLog: debug.IDebugger = debug('app');

  constructor() {
    this.config();
    this.routesConfig();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(DomainError.errorMiddleware);
  }

  routesConfig() {
    this.routes.push(new LoginRoutes(this.app));
    this.routes.push(new MatchRoutes(this.app));
    this.routes.push(new ClubRoutes(this.app));
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      this.routes.forEach((route: CommonRoutesConfig) => {
        this.debugLog(`Routes configured for ${route.getName()}`);
      });
      console.log('iniciado porta:', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
