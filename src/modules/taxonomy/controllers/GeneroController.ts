import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { Familia } from "../models/Familia";
import { Genero } from "../models/Genero";

export class GeneroController {
  public static async postGenero(req: Request, res: Response) {
    try {
      await Genero.create({
        generoNombre: req.body.generoNombre,
        familiaId: req.body.familiaId,
      });
      return res.status(200).json({ message: "Genero creado con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getGeneros(req: Request, res: Response) {
    try {
      const familiaId = req.query.familiaId;
      const generos = await Genero.findAll({
        where: familiaId
          ? {
              familiaId: Number(familiaId),
            }
          : {},
        attributes: ["generoId", "generoNombre"],
        include: { model: Familia, attributes: ["familiaId", "familiaNombre"] },
      });
      return res.status(200).json({ data: generos });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getGeneroById(req: Request, res: Response) {
    try {
      const { generoId } = req.params;
      const generos = await Genero.findByPk(generoId, {
        attributes: ["generoId", "generoNombre"],
        include: { model: Familia, attributes: ["familiaId", "familiaNombre"] },
      });
      return res.status(200).json({ data: generos });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async deleteGenero(req: Request, res: Response) {
    try {
      const genero = await Genero.findByPk(req.params.generoId);
      if (!genero)
        return res.status(400).json({ error: "Genero no encontrado" });
      genero.destroy();
      await genero.save();
      return res.status(200).json({ message: "Genero eliminado con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async updateGenero(req: Request, res: Response) {
    try {
      const { generoNombre, familiaId } = req.body;
      const genero = await Genero.findByPk(req.params.generoId);
      if (!genero)
        return res.status(400).json({ error: "Genero no encontrado" });

      await Genero.update(
        { generoNombre, familiaId },
        { where: { generoId: genero.generoId }, individualHooks: true }
      );

      return res.status(200).json({ message: "Genero actualizado con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
