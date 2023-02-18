import { Router, Request, Response } from "express";
import { IController } from "../../utils/interfaces/IController";

// Controllers
import { UsuarioController } from "./Controllers/UsuariosController";
import { RolController } from "./Controllers/RolController";
// Middlewares
import { UsuarioMiddlewares } from "./UsuarioMiddlewares";
export class UsuariosRoutes implements IController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes(): void {
    this.router.get("/roles", async (req: Request, res: Response) => {
      RolController.getRoles(req, res);
    });

    this.router.post(
      "/",
      UsuarioMiddlewares.createUsuarioMiddleware,
      async (req: Request, res: Response) => {
        UsuarioController.createUsuario(req, res);
      }
    );

    this.router.get(
      "/:usuarioId",
      UsuarioMiddlewares.getOrDeleteUsuarioByIdMiddleware,
      async (req: Request, res: Response) => {
        UsuarioController.getUsuarioById(req, res);
      }
    );

    this.router.get(
      "/",
      UsuarioMiddlewares.getUsuariosMiddleware,
      async (req: Request, res: Response) => {
        UsuarioController.getUsuarios(req, res);
      }
    );

    this.router.delete(
      "/:usuarioId",
      UsuarioMiddlewares.getOrDeleteUsuarioByIdMiddleware,
      async (req: Request, res: Response) => {
        UsuarioController.deleteUsuario(req, res);
      }
    );

    this.router.put(
      "/:usuarioId",
      UsuarioMiddlewares.updateUsuarioMiddleware,
      async (req: Request, res: Response) => {
        UsuarioController.updateUsuario(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
