import { Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";

export class SubespecieMiddlewares {
  // Checks if there are any problem
  private static grantAccess = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  public static createSubespecieMiddleware = [
    body("subespecieNombre").notEmpty().isLength({ min: 5, max: 50 }),
    body("especieId").notEmpty().isNumeric(),
    SubespecieMiddlewares.grantAccess,
  ];

  public static getOrDeleteSubespecieByIdMiddleware = [
    param("subespecieId").notEmpty().isNumeric(),
    SubespecieMiddlewares.grantAccess,
  ];

  public static getSubespecieMiddleware = [
    query("familiaId").isNumeric().optional({ nullable: true }),
    query("generoId").isNumeric().optional({ nullable: true }),
    query("especieId").isNumeric().optional({ nullable: true }),
    SubespecieMiddlewares.grantAccess,
  ];


  
  public static updateSubespecieMiddleware = [
    param("subespecieId").notEmpty().isNumeric(),
    body("subespecieNombre").notEmpty().isLength({ min: 5, max: 50 }),
    body("especieId").notEmpty().isNumeric(),
    SubespecieMiddlewares.grantAccess,
  ];
}
