import { ClubsController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class ClubRoutes extends CommonRoutesConfig {
  private ClubsController: ClubsController;

  constructor() {
    super();
    this.ClubsController = new ClubsController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/clubs', this.ClubsController.getClubs);
    this.router.get('/clubs/:id', this.ClubsController.getByIdClub);
  }
}

export default ClubRoutes;
