import md5 from 'md5';
import { prisma } from '../database/prismaClient';
import { createToken } from '../auth/jwtFunctions';

export class UserService {
  async createUser({ name, email, password, role = 'customer' }: { name: string; email: string; password: string; role?: string }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { type: 'CONFLICT', payload: { token: null } };
    }

    const hashedPassword = md5(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    const token = createToken(userWithoutPassword);
    return { type: null, payload: { token, user: userWithoutPassword } };
  }

  async login({ email, password }: { email: string; password: string }) {
    const hashedPassword = md5(password);
    const user = await prisma.user.findFirst({
      where: {
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return { type: 'NOT_FOUND', payload: { token: null } };
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = createToken(userWithoutPassword);
    return { type: null, payload: { token, user: userWithoutPassword } };
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return { type: null, payload: users };
  }
}
