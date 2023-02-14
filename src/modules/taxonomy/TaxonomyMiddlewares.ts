import { Service } from "typedi";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

@Service()
export class TaxonomyMiddlewares {
  constructor() {}
}
