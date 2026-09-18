import jwt, { SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_delivery_portfolio_2026';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export interface UserTokenPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const createToken = (userWithoutPassword: UserTokenPayload): string => {
  return jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
};

export const verifyToken = (authorization: string): UserTokenPayload | { isError: true; erro: any } => {
  try {
    const payload = jwt.verify(authorization, secret) as { data: UserTokenPayload };
    return payload.data;
  } catch (erro) {
    return { isError: true, erro };
  }
};
