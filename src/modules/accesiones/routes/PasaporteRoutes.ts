import { Router, Request, Response } from "express";
import { IController } from "../../../utils/interfaces/IController";
// Controllers
import { FormulariosController } from "../controllers/FormulariosController";
import { PasaporteController } from "../controllers/PasaporteControllers";

export class PasaporteRoutes implements IController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes(): void {
    this.router.post("/pasaporte", async (req: Request, res: Response) => {
      PasaporteController.createAccesion(req, res);
    });

    this.router.get(
      "/pasaporte/:accesionId",
      async (req: Request, res: Response) => {
        PasaporteController.getPasaporteById(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
