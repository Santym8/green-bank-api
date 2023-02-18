import { Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";

export class UsuarioMiddlewares {
  // Checks if there are any problem
  private static grantAccess = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  public static createUsuarioMiddleware = [
    body("usuarioNombres").notEmpty().isLength({ min: 5, max: 50 }),
    body("usuarioApellidos").notEmpty().isLength({ min: 5, max: 50 }),
    body("usuarioEmail").notEmpty().isEmail(),
    body("usuarioTelefono").notEmpty().isMobilePhone("es-EC"),
    body("usuarioContrasenia").notEmpty().isLength({ min: 5, max: 50 }),
    body("rolId").notEmpty().isNumeric(),
    UsuarioMiddlewares.grantAccess,
  ];

  public static getUsuariosMiddleware = [
    query("rolId").isNumeric().optional({ nullable: true }),
    query("createdAtInicio").isDate().optional({ nullable: true }),
    query("createdAtFinal").isDate().optional({ nullable: true }),
    UsuarioMiddlewares.grantAccess,
  ];

  public static getOrDeleteUsuarioByIdMiddleware = [
    param("usuarioId").notEmpty().isNumeric(),
    UsuarioMiddlewares.grantAccess,
  ];

  public static updateUsuarioMiddleware = [
    param("usuarioId").notEmpty().isNumeric(),
    body("usuarioNombres").notEmpty().isLength({ min: 5, max: 50 }),
    body("usuarioApellidos").notEmpty().isLength({ min: 5, max: 50 }),
    body("usuarioEmail").notEmpty().isEmail(),
    body("usuarioTelefono").notEmpty().isMobilePhone("es-EC"),
    body("rolId").notEmpty().isNumeric(),
    UsuarioMiddlewares.grantAccess,
  ];
}
