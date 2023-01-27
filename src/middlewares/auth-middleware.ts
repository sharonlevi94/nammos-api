import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.headers.authorization, 'req.headers.authorization');
      if (!req.headers.authorization) {
        return res
          .status(422)
          .send({ message: 'AUTHORIZATION HEADER IS NOT VALID' });
      }
      const userJwt = await this.jwtService.verify(req.headers.authorization);
      if (!userJwt?.jti) {
        return res
          .status(422)
          .send({ message: 'AUTHORIZATION HEADER IS NOT VALID' });
      }
      return next();
    } catch (e) {
      new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
