import { PrismaClient } from '@prisma/client';
import { DatabaseProvider, CacheProvider } from '@cloud-secure/shared';
import { CacheService } from '@cloud-secure/shared/services/CacheService';

export class UserDatabaseService {
  private prisma: PrismaClient;
  private cacheService: CacheService;

  constructor(
    private databaseProvider: DatabaseProvider,
    private cacheProvider: CacheProvider
  ) {
    this.prisma = databaseProvider.getPrismaClient();
    this.cacheService = CacheService.getInstance(cacheProvider);
  }

  // User management methods
  async createUser(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    return this.prisma.user.create({
      data
    });
  }

  async getUserById(id: string) {
    const cacheKey = `user:id:${id}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) await this.cacheService.set(cacheKey, user, { ttl: 3600 });
    return user;
  }

  async getUserByEmail(email: string) {
    const cacheKey = `user:email:${email}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) await this.cacheService.set(cacheKey, user, { ttl: 3600 });
    return user;
  }

  async updateUser(id: string, data: {
    email?: string;
    firstName?: string;
    lastName?: string;
  }) {
    const result = await this.prisma.user.update({
      where: { id },
      data
    });
    await this.cacheService.set(`user:id:${id}`, result, { ttl: 3600 });
    if (data.email) {
      await this.cacheService.set(`user:email:${data.email}`, result, { ttl: 3600 });
    }
    return result;
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.delete({ where: { id } });
    await this.cacheService.delete(`user:id:${id}`);
    if (user.email) {
      await this.cacheService.delete(`user:email:${user.email}`);
    }
    return user;
  }
}