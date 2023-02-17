import { Request, Response } from "express";
import { Familia } from "../models/Familia";
import { Genero } from "../models/Genero";
import { Especie } from "../models/Especie";
import { Subespecie } from "../models/Subespecie";

export class SubespecieController {
  public static async postSubespecie(req: Request, res: Response) {
    try {
      const { subespecieNombre, especieId } = req.body;
      await Subespecie.create({
        subespecieNombre,
        especieId,
      });
      return res.status(200).json({ message: "Subespecie creada con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getSubespeciesById(req: Request, res: Response) {
    try {
      const { subespecieId } = req.params;

      const subespecies = await Subespecie.findByPk(subespecieId, {
        attributes: ["subespecieId", "subespecieNombre"],
        include: [
          {
            model: Especie,
            attributes: ["especieNombre"],
            include: [
              {
                model: Genero,
                attributes: ["generoNombre"],
                include: [{ model: Familia, attributes: ["familiaNombre"] }],
              },
            ],
          },
        ],
      });
      return res.status(200).json({ data: subespecies });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getSubespecies(req: Request, res: Response) {
    try {
      const { familiaId, generoId, especieId } = req.query;

      const especies = await Subespecie.findAll({
        attributes: ["subespecieId", "subespecieNombre"],
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
      });
      return res.status(200).json({ data: especies });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async deleteSubespecie(req: Request, res: Response) {
    try {
      const { subespecieId } = req.params;
      const subespecie = await Subespecie.findByPk(subespecieId);
      if (!subespecie)
        return res.status(400).json({ error: "Subespecie no encontrada" });
      subespecie.destroy();
      await subespecie.save();
      return res
        .status(200)
        .json({ message: "Subespecie eliminada con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async updateSubespecie(req: Request, res: Response) {
    try {
      const { subespecieNombre, especieId } = req.body;
      const { subespecieId } = req.params;

      const subespecie = await Subespecie.findByPk(subespecieId);
      if (!subespecie)
        return res.status(400).json({ error: "Subespecie no encontrada" });

      await Subespecie.update(
        { subespecieNombre, especieId },
        {
          where: { subespecieId: subespecieId },
          individualHooks: true,
        }
      );

      return res
        .status(200)
        .json({ message: "Subespecie actualizada con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
