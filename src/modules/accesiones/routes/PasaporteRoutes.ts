import { Router, Request, Response } from "express";
import multer from "multer";
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
    const updload = multer().array("fotos", 5);

    this.router.post(
      "/pasaporte",
      updload,
      async (req: Request, res: Response) => {
        PasaporteController.createAccesion(req, res);
      }
    );

    this.router.get(
      "/pasaporte/:accesionId",
      async (req: Request, res: Response) => {
        PasaporteController.getPasaporteById(req, res);
      }
    );

    this.router.delete(
      "/pasaporte/:accesionId",
      async (req: Request, res: Response) => {
        PasaporteController.deleteAccesion(req, res);
      }
    );

    this.router.get("/pasaporte", async (req: Request, res: Response) => {
      PasaporteController.getAccesiones(req, res);
    });

    this.router.put(
      "/pasaporte/:accesionId",
      async (req: Request, res: Response) => {
        PasaporteController.putAccesion(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
