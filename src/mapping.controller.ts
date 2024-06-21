import { Request, Response, NextFunction } from 'express';

export function mappingMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  req.body.username ??= req.body.email;
  req.body.password ??= req.body.pass;

  next();
}
