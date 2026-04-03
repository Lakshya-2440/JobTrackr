import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

type RequestProperty = 'body' | 'query' | 'params';

const validate =
  (schema: ZodTypeAny, property: RequestProperty) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req[property]);
      (req as Request)[property] = parsed;
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateBody = (schema: ZodTypeAny) => validate(schema, 'body');
export const validateQuery = (schema: ZodTypeAny) => validate(schema, 'query');
export const validateParams = (schema: ZodTypeAny) => validate(schema, 'params');

