import { Request, Response } from "express";
import { Familia } from "../models/Familia";
import { Genero } from "../models/Genero";

export class GeneroController {
  public static async postGenero(req: Request, res: Response) {
    try {
      await Genero.create({
        generoNombre: req.body.nombre,
        familiaId: req.body.idFamilia,
      });
      return res.status(200).json({ message: "Genero creado con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getAllGeneros(req: Request, res: Response) {
    try {
      const generos = await Genero.findAll({
        attributes: ["generoId", "generoNombre"],
        include: { model: Familia, attributes: ["familiaId", "familiaNombre"] },
      });
      return res.status(200).json({ data: generos });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getAllGenerosByFamilia(req: Request, res: Response) {
    try {
      const familiaId: number = Number(req.query.familiaId!);

      const generos = await Genero.findAll({
        where: {
          familiaId: familiaId,
        },
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
      const genero = await Genero.findByPk(req.params.id);
      if (!genero)
        return res.status(400).json({ error: "Genero no encontrado" });
      genero.destroy();
      await genero.save();
      return res.status(200).json({ message: "Genero eliminado con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
