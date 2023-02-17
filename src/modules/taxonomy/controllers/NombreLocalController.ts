import { Request, Response } from "express";
import { Familia } from "../models/Familia";
import { Genero } from "../models/Genero";
import { Especie } from "../models/Especie";
import { Subespecie } from "../models/Subespecie";
import { NombreLocal } from "../models/NombreLocal";

export class NombreLocalController {
  public static async postNombreLocal(req: Request, res: Response) {
    try {
      const { nombreLocalNombre, subespecieId } = req.body;
      await NombreLocal.create({
        nombreLocalNombre,
        subespecieId,
      });
      return res.status(200).json({ message: "Nombre local creado con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getNombreLocalById(req: Request, res: Response) {
    try {
      const { nombreLocalId } = req.params;

      const nombreLocal = await NombreLocal.findByPk(nombreLocalId, {
        attributes: ["nombreLocalId", "nombreLocalNombre"],
        include: [
          {
            model: Subespecie,
            attributes: ["subespecieNombre"],
            include: [
              {
                model: Especie,
                attributes: ["especieNombre"],
                include: [
                  {
                    model: Genero,
                    attributes: ["generoNombre"],
                    include: [
                      { model: Familia, attributes: ["familiaNombre"] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.status(200).json({ data: nombreLocal });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getNombreLocal(req: Request, res: Response) {
    try {
      const { familiaId, generoId, especieId, subespecieId } = req.query;

      const nombresLocales = await NombreLocal.findAll({
        attributes: ["nombreLocalId", "nombreLocalNombre"],
        include: [
          {
            model: Subespecie,
            attributes: ["subespecieId", "subespecieNombre"],
            where: [subespecieId ? { subespecieId: subespecieId } : {}],
            include: [
              {
                model: Especie,
                attributes: ["especieNombre"],
                where: [
                  especieId
                    ? {
                        especieId: Number(especieId),
                      }
                    : {},
                ],
                include: [
                  {
                    model: Genero,
                    attributes: ["generoNombre"],
                    where: [
                      generoId
                        ? {
                            generoId: Number(generoId),
                          }
                        : {},
                    ],
                    include: [
                      {
                        model: Familia,
                        attributes: ["familiaNombre"],
                        where: [
                          familiaId
                            ? {
                                familiaId: Number(familiaId),
                              }
                            : {},
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.status(200).json({ data: nombresLocales });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async deleteNombreLocal(req: Request, res: Response) {
    try {
      const { nombreLocalId } = req.params;
      const nombreLocal = await NombreLocal.findByPk(nombreLocalId);
      if (!nombreLocal)
        return res.status(400).json({ error: "Nombre local no encontrado" });
      nombreLocal.destroy();
      await nombreLocal.save();
      return res
        .status(200)
        .json({ message: "Nombre local eliminado con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async updateNombreLocal(req: Request, res: Response) {
    try {
      const { nombreLocalNombre, subespecieId } = req.body;
      const { nombreLocalId } = req.params;

      const nombreLocal = await NombreLocal.findByPk(nombreLocalId);
      if (!nombreLocal)
        return res.status(400).json({ error: "Nombre local no encontrado" });

      await NombreLocal.update(
        { nombreLocalNombre, subespecieId },
        {
          where: { nombreLocalId: nombreLocalId },
          individualHooks: true,
        }
      );

      return res
        .status(200)
        .json({ message: "Nombre local actualizado con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
