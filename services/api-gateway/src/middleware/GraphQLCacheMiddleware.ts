import { CacheProvider } from '@cloud-secure/shared/providers/CacheProvider';
import { CacheService } from '@cloud-secure/shared/services/CacheService';
import { GraphQLResolveInfo } from 'graphql';

interface CacheConfig {
  ttl?: number;
  keyPrefix?: string;
  condition?: (args: any) => boolean;
}

export class GraphQLCacheMiddleware {
  private cacheService: CacheService;

  constructor(cacheProvider: CacheProvider) {
    this.cacheService = CacheService.getInstance(cacheProvider);
  }

  createMiddleware(config: CacheConfig = {}) {
    const {
      ttl = 3600,
      keyPrefix = 'graphql',
      condition = () => true
    } = config;

    return async (
      resolve: any,
      root: any,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ) => {
      // Skip caching if condition is not met
      if (!condition(args)) {
        return resolve(root, args, context, info);
      }

      const cacheKey = this.generateCacheKey(keyPrefix, info.fieldName, args);

      try {
        // Try to get from cache first
        const cached = await this.cacheService.get(cacheKey);
        if (cached !== null) {
          return cached;
        }

        // If not in cache, resolve and cache the result
        const result = await resolve(root, args, context, info);
        await this.cacheService.set(cacheKey, result, { ttl });
        return result;
      } catch (error) {
        // On cache error, just resolve without caching
        console.error('Cache middleware error:', error);
        return resolve(root, args, context, info);
      }
    };
  }

  private generateCacheKey(prefix: string, fieldName: string, args: any): string {
    const argsKey = Object.keys(args).length
      ? `:${JSON.stringify(args)}`
      : '';
    return this.cacheService.generateKey(prefix, fieldName, argsKey);
  }

  async clearCache(pattern: string): Promise<void> {
    // Implementation would depend on your Redis client's capabilities
    // This is a basic example
    await this.cacheService.delete(pattern);
  }
}