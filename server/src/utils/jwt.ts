import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

interface TokenPayload extends JwtPayload {
  sub: string;
}

const createToken = (secret: string, expiresIn: string, userId: string) =>
  jwt.sign({}, secret, {
    subject: userId,
    expiresIn: expiresIn as SignOptions['expiresIn']
  });

export const signAccessToken = (userId: string) => createToken(env.JWT_SECRET, env.JWT_EXPIRES_IN, userId);

export const signRefreshToken = (userId: string) =>
  createToken(env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN, userId);

export const verifyAccessToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as TokenPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;

