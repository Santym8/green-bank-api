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
        include: { model: Familia, attributes: ["familiaId","familiaNombre"] },
      });
      return res.status(200).json({ data: generos });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
