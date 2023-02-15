import { Router, Request, Response } from "express";
import { FamiliaController } from "./controllers/FamiliaController";
import { IController } from "../../utils/interfaces/IController";
import { FamiliaMiddlewares } from "./middlewares/FamiliaMiddlewares";
export class TaxonomyController implements IController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes(): void {
    this.router.post(
      "/familia",
      FamiliaMiddlewares.createFamiliaMiddleware,
      async (req: Request, res: Response) => {
        FamiliaController.postFamilia(req, res);
      }
    );

    this.router.get("/familia", async (req: Request, res: Response) => {
      FamiliaController.getAllFamilia(req, res);
    });

    this.router.delete(
      "/familia/:id",
      FamiliaMiddlewares.deleteFamiliaMiddleware,
      async (req: Request, res: Response) => {
        FamiliaController.deleteFamilia(req, res);
      }
    );

    this.router.put(
      "/familia/:id",
      FamiliaMiddlewares.updateFamiliaMiddleware,
      async (req: Request, res: Response) =>
        FamiliaController.putFamilia(req, res)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
