import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";
import { ApiError } from "../utils/api.Error";

export const validate = (schema: ZodObject<ZodRawShape>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new ApiError(422, "Validation failed in payload.", result.error.flatten().fieldErrors)
      );
    }
    next();
  };
