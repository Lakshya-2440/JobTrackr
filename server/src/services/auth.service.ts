import { prisma } from '../config/prisma';
import { LoginInput, RegisterInput } from '../schemas/auth.schema';
import { ApiError } from '../utils/ApiError';
import { comparePassword, hashPassword } from '../utils/hash';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  createdAt: true,
  updatedAt: true
} as const;

export const authService = {
  async register(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      throw new ApiError(409, 'Email is already in use');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword
      },
      select: safeUserSelect
    });

    return {
      accessToken: signAccessToken(user.id),
      refreshToken: signRefreshToken(user.id),
      user
    };
  },

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
    }

    return {
      accessToken: signAccessToken(user.id),
      refreshToken: signRefreshToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  },

  async refreshToken(token: string) {
    const payload = verifyRefreshToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: safeUserSelect
    });

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    return {
      accessToken: signAccessToken(user.id)
    };
  }
};

export type RegisterServiceInput = RegisterInput;
export type LoginServiceInput = LoginInput;
