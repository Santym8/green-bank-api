import { Request, Response } from "express";

import { Rol } from "../models/Rol";

export class RolController {
  public static async getRoles(req: Request, res: Response) {
    Rol.findAll({
      attributes: ["rolId", "rolNombre"],
    })
      .catch((e) => {
        return res.status(400).json({ error: e.message });
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }
}
