
import { Router, Request, Response } from "express";
import { TaxonomySevice } from "./TaxonomySevice";
import { IController } from "../../utils/interfaces/IController";

export class TaxonomyController implements IController {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes(): void {
    this.router.post("/familia", async (req: Request, res: Response) => {
      TaxonomySevice.postFamilia(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
