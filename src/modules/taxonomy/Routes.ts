import { Router, Request, Response } from "express";
import { IController } from "../../utils/interfaces/IController";
import { EspecieController } from "./controllers/EspecieController";
// Controllers
import { FamiliaController } from "./controllers/FamiliaController";
import { GeneroController } from "./controllers/GeneroController";
import { EspecieMiddlewares } from "./middlewares/EspecieMiddlewares";
// Middlewares
import { FamiliaMiddlewares } from "./middlewares/FamiliaMiddlewares";
import { GeneroMiddlewares } from "./middlewares/GeneroMiddlewares";
export class TaxonomyController implements IController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes(): void {
    // -----------------------------Familia---------------------------
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

    // -----------------------------Genero---------------------------

    this.router.post(
      "/genero",
      GeneroMiddlewares.createOrUpdateGeneroMiddleware,
      async (req: Request, res: Response) =>
        GeneroController.postGenero(req, res)
    );

    this.router.get(
      "/genero",
      GeneroMiddlewares.getGenerosMiddleware,
      async (req: Request, res: Response) => {
        GeneroController.getGeneros(req, res);
      }
    );

    this.router.delete(
      "/genero/:generoId",
      GeneroMiddlewares.deleteGeneroMiddleware,
      async (req: Request, res: Response) => {
        GeneroController.deleteGenero(req, res);
      }
    );

    this.router.put(
      "/genero/:generoId",
      GeneroMiddlewares.createOrUpdateGeneroMiddleware,
      async (req: Request, res: Response) => {
        GeneroController.updateGenero(req, res);
      }
    );

    // -----------------------------Especie---------------------------
    this.router.post(
      "/especie",
      EspecieMiddlewares.createOrUpdateEspecieMiddleware,
      async (req: Request, res: Response) => {
        EspecieController.postEspecie(req, res);
      }
    );

    this.router.get(
      "/especie",
      EspecieMiddlewares.getEspecieMiddleware,
      async (req: Request, res: Response) => {
        EspecieController.getEspecies(req, res);
      }
    );

    this.router.get(
      "/especie/:especieId",
      EspecieMiddlewares.getEspecieByOrDeleteIdMiddleware,
      async (req: Request, res: Response) => {
        EspecieController.getEspeciesById(req, res);
      }
    );

    this.router.delete(
      "/especie/:especieId",
      EspecieMiddlewares.getEspecieByOrDeleteIdMiddleware,
      async (req: Request, res: Response) => {
        EspecieController.deleteEspecie(req, res);
      }
    );

    this.router.put(
      "/especie/:especieId",
      EspecieMiddlewares.createOrUpdateEspecieMiddleware,
      async (req: Request, res: Response) => {
        EspecieController.updateEspecie(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
