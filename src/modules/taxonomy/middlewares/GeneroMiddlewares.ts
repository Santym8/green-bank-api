import { Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";

export class GeneroMiddlewares {
  // Checks if there are any problem
  private static grantAccess = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  public static createOrUpdateGeneroMiddleware = [
    body("generoNombre").notEmpty().isLength({ min: 5, max: 50 }),
    body("familiaId").notEmpty().isNumeric(),
    GeneroMiddlewares.grantAccess,
  ];

  public static getAllGenerosByFamiliaMiddleware = [
    query("familiaId").notEmpty().isNumeric(),
    GeneroMiddlewares.grantAccess,
  ];

  public static deleteGeneroMiddleware = [
    param("generoId").notEmpty().isNumeric(),
    GeneroMiddlewares.grantAccess,
  ];


  // public static updateGeneroMiddleware = [
  //   param("id").notEmpty().isNumeric(),
  //   body("nombre").notEmpty().isLength({ min: 5, max: 50 }),
  //   GeneroMiddlewares.grantAccess,
  // ];
}
