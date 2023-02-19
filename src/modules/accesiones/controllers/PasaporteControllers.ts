import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../../../config/DataBase";
import { Accesion } from "../models/Accesion";
import { Clima } from "../models/pasaporte/Clima";
import { Fechas } from "../models/pasaporte/Fechas";
import { Informacion } from "../models/pasaporte/Informacion";
import { Observacion } from "../models/pasaporte/Observacion";
import { Recoleccion } from "../models/pasaporte/Recoleccion";
import { Suelo } from "../models/pasaporte/Suelo";
import { Terreno } from "../models/pasaporte/Terreno";
import { UbicacionRecoleccion } from "../models/pasaporte/UbicacionRecoleccion";

export class PasaporteController {
  public static makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  public static async createAccesion(req: Request, res: Response) {
    try {
      const {
        //accesion
        usuarioId,
        nombreLocalId,
        estadoAccesionId,
        // Recoleccion
        recoleccionNombre,
        recoleccionApellidos,
        recoleccionFecha,
        institutoColectorId,
        // UbicacionRecolecion
        ubicacionRecoleccionGrupoEtnico,
        ubicacionRecoleccionGrupoIdioma,
        ubicacionRecoleccionGrupoPais,
        ubicacionRecoleccionGrupoProvincia,
        ubicacionRecoleccionGrupoCanton,
        ubicacionRecoleccionGrupoParroquia,
        ubicacionRecoleccionGrupoLocalidad,
        ubicacionRecoleccionGrupoNombrePredio,
        ubicacionRecoleccionGrupoPropietario,
        ubicacionRecoleccionGrupoLocalizacion,
        ubicacionRecoleccionGrupoLatitud,
        ubicacionRecoleccionGrupoLongitud,
        ubicacionRecoleccionGrupoAltitud,
        // Suelo
        sueloDetalleTextura,
        sueloDetallePedregosidad,
        drenajeSueloId,
        colorSueloId,
        pedregosidadId,
        texturaSueloId,
        erosionSueloId,
        // Clima
        climaTemperatura,
        climaHumedad,
        luzId,
        // Terreno
        terrenoDetallesTopografia,
        terrenoDetallesFisiografia,
        terrenoDetallesVegetacion,
        terrenoDetallesFormaGeografica,
        terrenoAspectoPendienteNorte,
        terrenoAspectoPendienteSur,
        terrenoAspectoPendienteEste,
        terrenoAspectoPendienteOeste,
        topografiaId,
        fisiografiaId,
        vegetacionAlrededorId,
        formaGeograficaId,
        formaPendienteId,
        // Fechas
        fechaSiembra,
        fechaFloracion,
        fechaFructificacion,
        fechaCosechas,
        // Informacion
        informacionDetallesEstado,
        informacionDetallesFuenteColeccion,
        informacionDetallesTipoMuestraColectada,
        informacionPoblacionAislada,
        informacionCultivosCerca,
        informacionPlantasMuestradas,
        informacionAreaMuestrada,
        informacionUsoMaterial,
        informacionDetallePartePlantaUtilizada,
        informacionEjemplarHerbario,
        informacionDetallePracticaCultural,
        informacionAsociasionEspeciesSilvestres,
        informacionPlagasEnfermedades,
        estadoGermoplasmaId,
        fuenteColeccionId,
        tipoMuestraColectadaId,
        partePlantaUtilizadaId,
        metodoMuestreoId,
        practicaCulturalId,
        frecuenciaMuestraId,
        estadoFenologicoPoblacionId,
        usoMaterialId,
        // Observacion
        observacionContenido,
      } = req.body;

      await sequelize.transaction(async (t: Transaction) => {
        const accesion = await Accesion.create(
          {
            accesionId: PasaporteController.makeid(8),
            usuarioId,
            nombreLocalId,
            estadoAccesionId,
          },
          { transaction: t }
        );

        const recoleccion = await Recoleccion.create(
          {
            accesionId: accesion.accesionId,
            recoleccionNombre,
            recoleccionApellidos,
            recoleccionFecha,
            institutoColectorId,
          },
          { transaction: t }
        );

        const ubicacionRecoleccion = await UbicacionRecoleccion.create(
          {
            accesionId: accesion.accesionId,
            ubicacionRecoleccionGrupoEtnico,
            ubicacionRecoleccionGrupoIdioma,
            ubicacionRecoleccionGrupoPais,
            ubicacionRecoleccionGrupoProvincia,
            ubicacionRecoleccionGrupoCanton,
            ubicacionRecoleccionGrupoParroquia,
            ubicacionRecoleccionGrupoLocalidad,
            ubicacionRecoleccionGrupoNombrePredio,
            ubicacionRecoleccionGrupoPropietario,
            ubicacionRecoleccionGrupoLocalizacion,
            ubicacionRecoleccionGrupoLatitud,
            ubicacionRecoleccionGrupoLongitud,
            ubicacionRecoleccionGrupoAltitud,
          },
          { transaction: t }
        );

        const suelo = await Suelo.create(
          {
            accesionId: accesion.accesionId,
            sueloDetalleTextura,
            sueloDetallePedregosidad,
            drenajeSueloId,
            colorSueloId,
            pedregosidadId,
            texturaSueloId,
            erosionSueloId,
          },
          { transaction: t }
        );

        const clima = await Clima.create(
          {
            accesionId: accesion.accesionId,
            climaTemperatura,
            climaHumedad,
            luzId,
          },
          { transaction: t }
        );

        const terreno = await Terreno.create(
          {
            accesionId: accesion.accesionId,
            terrenoDetallesTopografia,
            terrenoDetallesFisiografia,
            terrenoDetallesVegetacion,
            terrenoDetallesFormaGeografica,
            terrenoAspectoPendienteNorte,
            terrenoAspectoPendienteSur,
            terrenoAspectoPendienteEste,
            terrenoAspectoPendienteOeste,
            topografiaId,
            fisiografiaId,
            vegetacionAlrededorId,
            formaGeograficaId,
            formaPendienteId,
          },
          { transaction: t }
        );

        const fechas = await Fechas.create(
          {
            accesionId: accesion.accesionId,
            fechaSiembra,
            fechaFloracion,
            fechaFructificacion,
            fechaCosechas,
          },
          { transaction: t }
        );

        const informacion = await Informacion.create(
          {
            accesionId: accesion.accesionId,
            informacionDetallesEstado,
            informacionDetallesFuenteColeccion,
            informacionDetallesTipoMuestraColectada,
            informacionPoblacionAislada,
            informacionCultivosCerca,
            informacionPlantasMuestradas,
            informacionAreaMuestrada,
            informacionUsoMaterial,
            informacionDetallePartePlantaUtilizada,
            informacionEjemplarHerbario,
            informacionDetallePracticaCultural,
            informacionAsociasionEspeciesSilvestres,
            informacionPlagasEnfermedades,
            estadoGermoplasmaId,
            fuenteColeccionId,
            tipoMuestraColectadaId,
            partePlantaUtilizadaId,
            metodoMuestreoId,
            practicaCulturalId,
            frecuenciaMuestraId,
            estadoFenologicoPoblacionId,
            usoMaterialId,
          },
          { transaction: t }
        );

        const observacion = await Observacion.create(
          {
            accesionId: accesion.accesionId,
            observacionContenido,
          },
          { transaction: t }
        );
      });
      return res.status(200).json({ message: "Accesion creada con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
