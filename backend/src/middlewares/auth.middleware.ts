import { Request, Response, NextFunction } from 'express';
import { verifyToken, UserTokenPayload } from '../auth/jwtFunctions';

export interface AuthenticatedRequest extends Request {
  user?: UserTokenPayload;
}

export const tokenValidation = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const payload = verifyToken(token);

  if ('isError' in payload) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  req.user = payload;
  next();
};
