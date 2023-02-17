import { Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";

export class NombreLocalMiddlewares {
  // Checks if there are any problem
  private static grantAccess = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  public static createNombreLocalMiddleware = [
    body("nombreLocalNombre").notEmpty().isLength({ min: 5, max: 50 }),
    body("subespecieId").notEmpty().isNumeric(),
    NombreLocalMiddlewares.grantAccess,
  ];

  public static getOrDeleteNombreLocalByIdMiddleware = [
    param("nombreLocalId").notEmpty().isNumeric(),
    NombreLocalMiddlewares.grantAccess,
  ];

  public static getNombreLocalMiddleware = [
    query("familiaId").isNumeric().optional({ nullable: true }),
    query("generoId").isNumeric().optional({ nullable: true }),
    query("especieId").isNumeric().optional({ nullable: true }),
    query("subespecieId").isNumeric().optional({ nullable: true }),
    NombreLocalMiddlewares.grantAccess,
  ];


  
  public static updateNombreLocalMiddleware = [
    param("nombreLocalId").notEmpty().isNumeric(),
    body("nombreLocalNombre").notEmpty().isLength({ min: 5, max: 50 }),
    body("subespecieId").notEmpty().isNumeric(),
    NombreLocalMiddlewares.grantAccess,
  ];
}
