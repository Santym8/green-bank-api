import { Request, Response } from "express";

import { Familia } from "./models/Familia";

export class TaxonomySevice {
  public static async postFamilia(req: Request, res: Response) {
    await Familia.create({
      familiaNombre: req.body.nombre,
    })
      .catch((e) => {
        return res.status(400).json({ mensaje: "Error" });
      })
      .then(() => {
        return res.status(200).json({ mensaje: "Se ha ingresado con exito" });
      });
  }
}
