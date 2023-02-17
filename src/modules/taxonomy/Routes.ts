import { Router, Request, Response } from "express";
import { IController } from "../../utils/interfaces/IController";
import { EspecieController } from "./controllers/EspecieController";
// Controllers
import { FamiliaController } from "./controllers/FamiliaController";
import { GeneroController } from "./controllers/GeneroController";
import { NombreLocalController } from "./controllers/NombreLocalController";
import { SubespecieController } from "./controllers/SubespecieController";
import { EspecieMiddlewares } from "./middlewares/EspecieMiddlewares";
// Middlewares
import { FamiliaMiddlewares } from "./middlewares/FamiliaMiddlewares";
import { GeneroMiddlewares } from "./middlewares/GeneroMiddlewares";
import { NombreLocalMiddlewares } from "./middlewares/NombreLocalMiddlewares";
import { SubespecieMiddlewares } from "./middlewares/SubespecieMiddlewares";
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
      FamiliaController.getFamilia(req, res);
    });

    this.router.get(
      "/familia/:familiaId",
      FamiliaMiddlewares.getFamiliaByIdMiddleware,
      async (req: Request, res: Response) => {
        FamiliaController.getFamiliaById(req, res);
      }
    );

    this.router.delete(
      "/familia/:familiaId",
      FamiliaMiddlewares.deleteFamiliaMiddleware,
      async (req: Request, res: Response) => {
        FamiliaController.deleteFamilia(req, res);
      }
    );

    this.router.put(
      "/familia/:familiaId",
      FamiliaMiddlewares.updateFamiliaMiddleware,
      async (req: Request, res: Response) =>
        FamiliaController.putFamilia(req, res)
    );

    // -----------------------------Genero---------------------------

    this.router.post(
      "/genero",
      GeneroMiddlewares.createGeneroMiddleware,
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

    this.router.get(
      "/genero/:generoId",
      GeneroMiddlewares.getGeneroByIdMiddleware,
      async (req: Request, res: Response) => {
        GeneroController.getGeneroById(req, res);
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
      GeneroMiddlewares.UpdateGeneroMiddleware,
      async (req: Request, res: Response) => {
        GeneroController.updateGenero(req, res);
      }
    );

    // -----------------------------Especie---------------------------
    this.router.post(
      "/especie",
      EspecieMiddlewares.createEspecieMiddleware,
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
      EspecieMiddlewares.updateEspecieMiddleware,
      async (req: Request, res: Response) => {
        EspecieController.updateEspecie(req, res);
      }
    );

    // -----------------------------Subespecie---------------------------
    this.router.post(
      "/subespecie",
      SubespecieMiddlewares.createSubespecieMiddleware,
      async (req: Request, res: Response) => {
        SubespecieController.postSubespecie(req, res);
      }
    );

    this.router.get(
      "/subespecie/:subespecieId",
      SubespecieMiddlewares.getOrDeleteSubespecieByIdMiddleware,
      async (req: Request, res: Response) => {
        SubespecieController.getSubespeciesById(req, res);
      }
    );

    this.router.get(
      "/subespecie",
      SubespecieMiddlewares.getSubespecieMiddleware,
      async (req: Request, res: Response) => {
        SubespecieController.getSubespecies(req, res);
      }
    );

    this.router.delete(
      "/subespecie/:subespecieId",
      SubespecieMiddlewares.getOrDeleteSubespecieByIdMiddleware,
      async (req: Request, res: Response) => {
        SubespecieController.deleteSubespecie(req, res);
      }
    );

    this.router.put(
      "/subespecie/:subespecieId",
      SubespecieMiddlewares.updateSubespecieMiddleware,
      async (req: Request, res: Response) => {
        SubespecieController.updateSubespecie(req, res);
      }
    );

    // -----------------------------Nombre Local---------------------------
    this.router.post(
      "/nombre-local",
      NombreLocalMiddlewares.createNombreLocalMiddleware,
      async (req: Request, res: Response) => {
        NombreLocalController.postNombreLocal(req, res);
      }
    );

    this.router.get(
      "/nombre-local/:nombreLocalId",
      NombreLocalMiddlewares.getOrDeleteNombreLocalByIdMiddleware,
      async (req: Request, res: Response) => {
        NombreLocalController.getNombreLocalById(req, res);
      }
    );

    this.router.get(
      "/nombre-local",
      NombreLocalMiddlewares.getNombreLocalMiddleware,
      async (req: Request, res: Response) => {
        NombreLocalController.getNombreLocal(req, res);
      }
    );

    this.router.delete(
      "/nombre-local/:nombreLocalId",
      NombreLocalMiddlewares.getOrDeleteNombreLocalByIdMiddleware,
      async (req: Request, res: Response) => {
        NombreLocalController.deleteNombreLocal(req, res);
      }
    );

    this.router.put(
      "/nombre-local/:nombreLocalId",
      NombreLocalMiddlewares.updateNombreLocalMiddleware,
      async (req: Request, res: Response) => {
        NombreLocalController.updateNombreLocal(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
