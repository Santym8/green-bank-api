import { Request, Response } from "express";
import { EstadoAccesion } from "../models/EstadoAccesion";
import { ColorSuelo } from "../models/formularios/ColorSuelo";
import { DrenajeSuelo } from "../models/formularios/DrenajeSuelo";
import { ErosionSuelo } from "../models/formularios/ErosionSuelo";
import { EstadoFenologicoPoblacion } from "../models/formularios/EstadoFenologicoPoblacion";
import { EstadoGermoplasma } from "../models/formularios/EstadoGermoplasma";
import { Fisiografia } from "../models/formularios/Fisiografia";
import { FormaGeografica } from "../models/formularios/FormaGeografica";
import { FormaPendiente } from "../models/formularios/FormaPendiente";
import { FrecuenciaMuestra } from "../models/formularios/FrecuenciaMuestra";
import { FuenteColeccion } from "../models/formularios/FuenteColeccion";
import { InstitutosColector } from "../models/formularios/InstitutosColector";
import { Luz } from "../models/formularios/Luz";
import { MetodoMuestreo } from "../models/formularios/MetodoMuestreo";
import { PartePlantaUtilizada } from "../models/formularios/PartePlantaUtilizada";
import { Pedregosidad } from "../models/formularios/Pedregosidad";
import { PracticaCultural } from "../models/formularios/PracticaCultural";
import { TexturaSuelo } from "../models/formularios/TexturaSuelo";
import { TipoMuestraColectada } from "../models/formularios/TipoMuestraColectada";
import { Topografia } from "../models/formularios/Topografia";
import { UsoMaterial } from "../models/formularios/UsoMaterial";
import { VegetacionAlrededor } from "../models/formularios/VegetacionAlrededor";

export class FormulariosController {
  public static async getColorSuelo(req: Request, res: Response) {
    ColorSuelo.findAll({
      attributes: ["colorSueloId", "colorSueloNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getDrenajeSuelo(req: Request, res: Response) {
    DrenajeSuelo.findAll({
      attributes: ["drenajeSueloId", "drenajeSueloNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getErosionSuelo(req: Request, res: Response) {
    ErosionSuelo.findAll({
      attributes: ["erosionSueloId", "erosionSueloNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getEstadoFenologicoPoblacion(
    req: Request,
    res: Response
  ) {
    EstadoFenologicoPoblacion.findAll({
      attributes: [
        "estadoFenologicoPoblacionId",
        "estadoFenologicoPoblacionNombre",
      ],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getEstadoGermoplasma(req: Request, res: Response) {
    EstadoGermoplasma.findAll({
      attributes: ["estadoGermoplasmaId", "estadoGermoplasmaNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getFisiografia(req: Request, res: Response) {
    Fisiografia.findAll({
      attributes: ["fisiografiaId", "fisiografiaNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getFormaGeografica(req: Request, res: Response) {
    FormaGeografica.findAll({
      attributes: ["formaGeograficaId", "formaGeograficaNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getFormaPendiente(req: Request, res: Response) {
    FormaPendiente.findAll({
      attributes: ["formaPendienteId", "formaPendienteNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getFrecuenciaMuestra(req: Request, res: Response) {
    FrecuenciaMuestra.findAll({
      attributes: ["frecuenciaMuestraId", "frecuenciaMuestraNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getFuenteColeccion(req: Request, res: Response) {
    FuenteColeccion.findAll({
      attributes: ["fuenteColeccionId", "fuenteColeccionNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getInstitutoColector(req: Request, res: Response) {
    InstitutosColector.findAll({
      attributes: ["institutoColectorId", "institutoColectorNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getLuz(req: Request, res: Response) {
    Luz.findAll({
      attributes: ["luzId", "luzNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getMetodoMuestreo(req: Request, res: Response) {
    MetodoMuestreo.findAll({
      attributes: ["metodoMuestreoId", "metodoMuestreoNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getPartePlantaUtilizada(req: Request, res: Response) {
    PartePlantaUtilizada.findAll({
      attributes: ["partePlantaUtilizadaId", "partePlantaUtilizadaNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getPedregosidad(req: Request, res: Response) {
    Pedregosidad.findAll({
      attributes: ["pedregosidadId", "pedregosidadNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getPracticaCultural(req: Request, res: Response) {
    PracticaCultural.findAll({
      attributes: ["practicaCulturalId", "practicaCulturalNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getTexturaSuelo(req: Request, res: Response) {
    TexturaSuelo.findAll({
      attributes: ["texturaSueloId", "texturaSueloNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getTipoMuestraColectada(req: Request, res: Response) {
    TipoMuestraColectada.findAll({
      attributes: ["tipoMuestraColectadaId", "tipoMuestraColectadaNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getTopografia(req: Request, res: Response) {
    Topografia.findAll({
      attributes: ["topografiaId", "topografiaNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getUsoMaterial(req: Request, res: Response) {
    UsoMaterial.findAll({
      attributes: ["usoMaterialId", "usoMaterialNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getVegetacionAlrededor(req: Request, res: Response) {
    VegetacionAlrededor.findAll({
      attributes: ["vegetacionAlrededorId", "vegetacionAlrededorNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async getEstadosAccesion(req: Request, res: Response) {
    EstadoAccesion.findAll({
      attributes: ["estadoAccesionId", "estadoAccesionNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }



}
