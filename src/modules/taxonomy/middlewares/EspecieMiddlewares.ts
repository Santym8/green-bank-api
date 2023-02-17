import { Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";

export class EspecieMiddlewares {
  // Checks if there are any problem
  private static grantAccess = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  public static createOrUpdateEspecieMiddleware = [
    body("especieNombre").notEmpty().isLength({ min: 5, max: 50 }),
    body("generoId").notEmpty().isNumeric(),
    EspecieMiddlewares.grantAccess,
  ];

  public static getEspecieMiddleware = [
    query("familiaId").isNumeric().optional({ nullable: true }),
    query("generoId").isNumeric().optional({ nullable: true }),
    EspecieMiddlewares.grantAccess,
  ];

  public static getEspecieByOrDeleteIdMiddleware = [
    param("especieId").notEmpty().isNumeric(),
    EspecieMiddlewares.grantAccess,
  ];

}
