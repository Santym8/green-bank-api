import { Request, Response } from "express";
import { body, validationResult, query, param } from "express-validator";

export class ProtocoloMiddlewares {
  // Checks if there are any problem
  private static grantAccess = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  public static createProtocoloMiddleware = [
    body("accesionId").notEmpty().isLength({ min: 8, max: 8 }),
    body("usuarioId").notEmpty().isNumeric(),
    ProtocoloMiddlewares.grantAccess,
  ];

  public static deleteProtocoloMiddleware = [
    param("protocoloId").notEmpty().isNumeric(),
    ProtocoloMiddlewares.grantAccess,
  ];
}
