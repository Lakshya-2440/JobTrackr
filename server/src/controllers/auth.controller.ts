import { Request, Response } from 'express';
import type { CookieOptions } from 'express-serve-static-core';
import { env } from '../config/env';
import { authService } from '../services/auth.service';
import { ApiError } from '../utils/ApiError';

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  // Cross-site frontend (e.g. Vercel) → API (e.g. Render) requires None + Secure
  sameSite: env.NODE_ENV === 'production' ? 'none' : 'strict',
  secure: env.NODE_ENV === 'production',
  maxAge: 30 * 24 * 60 * 60 * 1000
};

export const authController = {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { refreshToken, ...payload } = await authService.register(name, email, password);

    res.cookie('refreshToken', refreshToken, refreshCookieOptions);
    res.status(201).json({
      success: true,
      data: payload
    });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { refreshToken, ...payload } = await authService.login(email, password);

    res.cookie('refreshToken', refreshToken, refreshCookieOptions);
    res.status(200).json({
      success: true,
      data: payload
    });
  },

  async refresh(_req: Request, res: Response) {
    const refreshToken = _req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token is required');
    }

    const accessToken = await authService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      data: accessToken
    });
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('refreshToken', refreshCookieOptions);
    res.status(204).send();
  },

  async me(req: Request, res: Response) {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    res.status(200).json({
      success: true,
      data: req.user
    });
  }
};

