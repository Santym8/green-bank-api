import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { Familia } from "../models/Familia";
import { Genero } from "../models/Genero";
import { Especie } from "../models/Especie";

export class EspecieController {
  public static async postEspecie(req: Request, res: Response) {
    try {
      await Especie.create({
        especieNombre: req.body.especieNombre,
        generoId: req.body.generoId,
      });
      return res.status(200).json({ message: "Especie creado con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getEspeciesById(req: Request, res: Response) {
    try {
      const especieId = Number(req.params.especieId!);

      const especies = await Especie.findAll({
        attributes: ["especieId", "especieNombre"],
        where: {
          especieId: especieId,
        },
      });
      return res.status(200).json({ data: especies });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getEspecies(req: Request, res: Response) {
    try {
      const familiaId = req.query.familiaId;
      const generoId = req.query.generoId;

      const especies = await Especie.findAll({
        attributes: ["especieId", "especieNombre"],
        include: [
          {
            model: Genero,
            attributes: ["generoId", "generoNombre"],
            where: generoId
              ? {
                  generoId: Number(generoId),
                }
              : {},
            include: [
              {
                model: Familia,
                attributes: ["familiaId", "familiaNombre"],
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
      });
      return res.status(200).json({ data: especies });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async deleteEspecie(req: Request, res: Response) {
    try {
      const especie = await Especie.findByPk(req.params.especieId);
      if (!especie)
        return res.status(400).json({ error: "Especie no encontrada" });
      especie.destroy();
      await especie.save();
      return res.status(200).json({ message: "Especie eliminada con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async updateEspecie(req: Request, res: Response) {
    try {
      const { especieNombre, generoId } = req.body;
      const especie = await Especie.findByPk(req.params.especieId);
      if (!especie)
        return res.status(400).json({ error: "Especie no encontrada" });

      await Especie.update(
        { especieNombre, generoId },
        { where: { especieId: especie.especieId }, individualHooks: true }
      );

      return res.status(200).json({ message: "Especie actualizada con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
