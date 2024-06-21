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

// {
//     "email": "wwwe",
//     "password": "wow"
// }
// can also be done as
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class MappingMiddleware implements NestMiddleware {
//   use(req: Request, _res: Response, next: NextFunction) {
//     req.body.username ??= req.body.email;
//     req.body.password ??= req.body.pass;

//     next();
//   }
// }
