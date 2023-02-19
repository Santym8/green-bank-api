import { Router, Request, Response } from "express";
import multer from "multer";
import { IController } from "../../../utils/interfaces/IController";
// Controllers
import { ProtocolosControllers } from "../controllers/ProtocolosControllers";
import { ProtocoloMiddlewares } from "../middlewares/ProtocoloMiddlewares";

export class ProtocolosRoutes implements IController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes(): void {
    const updload = multer({ limits: { fileSize: 32 * 1024 * 1024 } }).single(
      "protocolo"
    );

    this.router.post(
      "/protocolo",
      updload,
      ProtocoloMiddlewares.createProtocoloMiddleware,
      async (req: Request, res: Response) => {
        ProtocolosControllers.createProtocolo(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
