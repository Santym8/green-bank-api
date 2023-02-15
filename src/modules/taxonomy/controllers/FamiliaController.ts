import { Request, Response } from "express";
import { Familia } from "../models/Familia";

export class FamiliaController {
  public static async getAllFamilia(req: Request, res: Response) {
    Familia.findAll({
      attributes: ["familiaId", "familiaNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  public static async postFamilia(req: Request, res: Response) {
    await Familia.create({
      familiaNombre: req.body.nombre,
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then(() => {
        return res.status(200).json({ message: "Familia creada con éxito" });
      });
  }

  public static async deleteFamilia(req: Request, res: Response) {
    const id: number = Number(req.params.id);

    const familia = await Familia.findByPk(id)
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then(async (result) => {
        if (!result) {
          return res.status(400).json({ error: "Familia NO encontrada" });
        }
        result.destroy();
        await (result as Familia).save();
        return res.status(200).json({ message: "Familia eliminada con éxito" });
      });
  }

  public static async putFamilia(req: Request, res: Response) {
    const id: number = Number(req.params.id);

    const familia = await Familia.findByPk(id)
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then(async (result) => {
        if (!result)
          return res.status(400).json({ error: "Familia NO encontrada" });

        result.set({ familiaNombre: req.body.nombre });
        await (result as Familia).save();
        return res
          .status(200)
          .json({ message: "Familia actualizada con éxito" });
      });
  }
}
