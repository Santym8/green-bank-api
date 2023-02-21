import { Router, Request, Response } from "express";
import { IController } from "../../../utils/interfaces/IController";
// Controllers
import { FormulariosController } from "../controllers/FormulariosController";

export class FromulariosRoutes implements IController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes(): void {
    this.router.get(
      "/formulario/color-suelo",
      async (req: Request, res: Response) => {
        FormulariosController.getColorSuelo(req, res);
      }
    );

    this.router.get(
      "/formulario/drenaje-suelo",
      async (req: Request, res: Response) => {
        FormulariosController.getDrenajeSuelo(req, res);
      }
    );

    this.router.get(
      "/formulario/erosion-suelo",
      async (req: Request, res: Response) => {
        FormulariosController.getErosionSuelo(req, res);
      }
    );

    this.router.get(
      "/formulario/estado-fenologico-poblacion",
      async (req: Request, res: Response) => {
        FormulariosController.getEstadoFenologicoPoblacion(req, res);
      }
    );

    this.router.get(
      "/formulario/estado-germoplasma",
      async (req: Request, res: Response) => {
        FormulariosController.getEstadoGermoplasma(req, res);
      }
    );

    this.router.get(
      "/formulario/fisiografia",
      async (req: Request, res: Response) => {
        FormulariosController.getFisiografia(req, res);
      }
    );

    this.router.get(
      "/formulario/forma-geografica",
      async (req: Request, res: Response) => {
        FormulariosController.getFormaGeografica(req, res);
      }
    );

    this.router.get(
      "/formulario/forma-pendiente",
      async (req: Request, res: Response) => {
        FormulariosController.getFormaPendiente(req, res);
      }
    );

    this.router.get(
      "/formulario/frecuencia-muestra",
      async (req: Request, res: Response) => {
        FormulariosController.getFrecuenciaMuestra(req, res);
      }
    );

    this.router.get(
      "/formulario/fuente-coleccion",
      async (req: Request, res: Response) => {
        FormulariosController.getFuenteColeccion(req, res);
      }
    );

    this.router.get(
      "/formulario/institutos-colectores",
      async (req: Request, res: Response) => {
        FormulariosController.getInstitutoColector(req, res);
      }
    );

    this.router.get("/formulario/luz", async (req: Request, res: Response) => {
      FormulariosController.getLuz(req, res);
    });

    this.router.get(
      "/formulario/metodo-muestreo",
      async (req: Request, res: Response) => {
        FormulariosController.getMetodoMuestreo(req, res);
      }
    );

    this.router.get(
      "/formulario/parte-planta-utilizada",
      async (req: Request, res: Response) => {
        FormulariosController.getPartePlantaUtilizada(req, res);
      }
    );

    this.router.get(
      "/formulario/pedregosidad",
      async (req: Request, res: Response) => {
        FormulariosController.getPedregosidad(req, res);
      }
    );

    this.router.get(
      "/formulario/practica-cultural",
      async (req: Request, res: Response) => {
        FormulariosController.getPracticaCultural(req, res);
      }
    );

    this.router.get(
      "/formulario/textura-suelo",
      async (req: Request, res: Response) => {
        FormulariosController.getTexturaSuelo(req, res);
      }
    );

    this.router.get(
      "/formulario/tipo-muestra-colectada",
      async (req: Request, res: Response) => {
        FormulariosController.getTipoMuestraColectada(req, res);
      }
    );

    this.router.get(
      "/formulario/topografia",
      async (req: Request, res: Response) => {
        FormulariosController.getTopografia(req, res);
      }
    );

    this.router.get(
      "/formulario/uso-material",
      async (req: Request, res: Response) => {
        FormulariosController.getUsoMaterial(req, res);
      }
    );

    this.router.get(
      "/formulario/vegetacion-alrededor",
      async (req: Request, res: Response) => {
        FormulariosController.getVegetacionAlrededor(req, res);
      }
    );

    this.router.get(
      "/formulario/estado-accesion",
      async (req: Request, res: Response) => {
        FormulariosController.getEstadosAccesion(req, res);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
