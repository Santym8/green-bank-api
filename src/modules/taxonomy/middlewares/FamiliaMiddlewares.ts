import { Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";

export class FamiliaMiddlewares {
  // Checks if there are any problem
  private static grantAccess = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  public static deleteFamiliaMiddleware = [
    param("id").notEmpty().isNumeric(),
    FamiliaMiddlewares.grantAccess,
  ];

  public static createFamiliaMiddleware = [
    body("nombre").notEmpty().isLength({ min: 5, max: 50 }),
    FamiliaMiddlewares.grantAccess,
  ];

  public static updateFamiliaMiddleware = [
    param("id").notEmpty().isNumeric(),
    body("nombre").notEmpty().isLength({ min: 5, max: 50 }),
    FamiliaMiddlewares.grantAccess,
  ];
}
