"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLCacheMiddleware = void 0;
const CacheService_1 = require("@cloud-secure/shared/services/CacheService");
class GraphQLCacheMiddleware {
    constructor(cacheProvider) {
        this.cacheService = CacheService_1.CacheService.getInstance(cacheProvider);
    }
    createMiddleware(config = {}) {
        const { ttl = 3600, keyPrefix = 'graphql', condition = () => true } = config;
        return async (resolve, root, args, context, info) => {
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
            }
            catch (error) {
                // On cache error, just resolve without caching
                console.error('Cache middleware error:', error);
                return resolve(root, args, context, info);
            }
        };
    }
    generateCacheKey(prefix, fieldName, args) {
        const argsKey = Object.keys(args).length
            ? `:${JSON.stringify(args)}`
            : '';
        return this.cacheService.generateKey(prefix, fieldName, argsKey);
    }
    async clearCache(pattern) {
        // Implementation would depend on your Redis client's capabilities
        // This is a basic example
        await this.cacheService.delete(pattern);
    }
}
exports.GraphQLCacheMiddleware = GraphQLCacheMiddleware;
