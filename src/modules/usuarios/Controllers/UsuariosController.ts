import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Usuario } from "../models/Usuario";

import { Rol } from "../models/Rol";
import { Op } from "sequelize";

export class UsuarioController {
  public static async createUsuario(req: Request, res: Response) {
    try {
      const {
        usuarioNombres,
        usuarioApellidos,
        usuarioEmail,
        usuarioTelefono,
        usuarioContrasenia,
        rolId,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const usuarioContraseniaCifrada = await bcrypt.hash(
        usuarioContrasenia,
        salt
      );

      await Usuario.create({
        usuarioNombres,
        usuarioApellidos,
        usuarioEmail,
        usuarioTelefono,
        usuarioContrasenia: usuarioContraseniaCifrada,
        rolId,
      });
      return res.status(200).json({ message: "Usuario creado con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getUsuarioById(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;

      const usuario = await Usuario.findAll({
        attributes: [
          "usuarioId",
          "usuarioNombres",
          "usuarioApellidos",
          "usuarioEmail",
          "usuarioTelefono",
          "createdAt",
        ],
        where: {
          usuarioId: usuarioId,
        },
        include: {
          model: Rol,
          attributes: ["rolId", "rolNombre"],
        },
      });
      return res.status(200).json({ data: usuario });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async getUsuarios(req: Request, res: Response) {
    try {
      const { rolId, createdAtInicio, createdAtFinal } = req.query;
      console.log(new Date(createdAtInicio as string));
      const usuario = await Usuario.findAll({
        attributes: [
          "usuarioId",
          "usuarioNombres",
          "usuarioApellidos",
          "usuarioEmail",
          "usuarioTelefono",
          "createdAt",
        ],
        where: [
          rolId
            ? {
                rolId: Number(rolId),
              }
            : {},
          createdAtInicio && createdAtFinal
            ? {
                createdAt: {
                  [Op.between]: [
                    new Date(createdAtInicio as string),
                    new Date(createdAtFinal as string),
                  ],
                },
              }
            : {},
          createdAtInicio && !createdAtFinal
            ? {
                createdAt: new Date(createdAtInicio as string),
              }
            : {},
        ],
        include: {
          model: Rol,
          attributes: ["rolId", "rolNombre"],
        },
      });
      return res.status(200).json({ data: usuario });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async deleteUsuario(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario)
        return res.status(400).json({ error: "Usuario no encontrado" });
      usuario.destroy();
      await usuario.save();
      return res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async updateUsuario(req: Request, res: Response) {
    try {
      const {
        usuarioNombres,
        usuarioApellidos,
        usuarioEmail,
        usuarioTelefono,
        usuarioContrasenia,
        rolId,
      } = req.body;

      const { usuarioId } = req.params;
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario)
        return res.status(400).json({ error: "Usuario no encontrado" });

      await Usuario.update(
        {
          usuarioNombres,
          usuarioApellidos,
          usuarioEmail,
          usuarioTelefono,
          usuarioContrasenia,
          rolId,
        },
        { where: { usuarioId: usuario.usuarioId }, individualHooks: true }
      );

      return res.status(200).json({ message: "Usuario actualizado con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async cambiarContraseniaUsuario(req: Request, res: Response) {
    try {
      const { usuarioContraseniaNueva, usuarioContraseniaActual } = req.body;
      const { usuarioId } = req.params;

      const usuario = await Usuario.findByPk(usuarioId);

      if (!usuario)
        return res.status(400).json({ error: "Usuario no encontrado" });

      const coincideContrasenia = await bcrypt.compare(
        usuarioContraseniaActual,
        usuario.usuarioContrasenia
      );

      if (!coincideContrasenia)
        return res.status(400).json({ error: "Contraseña incorrecta" });

      const salt = await bcrypt.genSalt(10);
      const usuarioContraseniaCifrada = await bcrypt.hash(
        usuarioContraseniaNueva,
        salt
      );

      await Usuario.update(
        {
          usuarioContrasenia: usuarioContraseniaCifrada,
        },
        { where: { usuarioId: usuarioId }, individualHooks: true }
      );

      return res
        .status(200)
        .json({ message: "Contraseña actualizada con exito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { usuarioEmail, usuarioContrasenia } = req.query;

      const usuario = await Usuario.findOne({
        attributes: [
          "usuarioId",
          "usuarioNombres",
          "usuarioApellidos",
          "usuarioEmail",
          "usuarioContrasenia",
        ],
        where: {
          usuarioEmail: usuarioEmail as string,
        },
        include: {
          model: Rol,
          attributes: ["rolId", "rolNombre"],
        },
      });

      if (!usuario)
        return res.status(400).json({ error: "Usuario no encontrado" });

      const coincideContrasenia = await bcrypt.compare(
        usuarioContrasenia as string,
        usuario.usuarioContrasenia
      );

      if (!coincideContrasenia)
        return res.status(400).json({ error: "Contraseña incorrecta" });

      usuario.usuarioContrasenia = "";

      return res.status(200).json({ data: usuario });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
