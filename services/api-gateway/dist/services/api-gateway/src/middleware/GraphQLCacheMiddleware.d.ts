import { CacheProvider } from '@cloud-secure/shared/providers/CacheProvider';
import { GraphQLResolveInfo } from 'graphql';
interface CacheConfig {
    ttl?: number;
    keyPrefix?: string;
    condition?: (args: any) => boolean;
}
export declare class GraphQLCacheMiddleware {
    private cacheService;
    constructor(cacheProvider: CacheProvider);
    createMiddleware(config?: CacheConfig): (resolve: any, root: any, args: any, context: any, info: GraphQLResolveInfo) => Promise<any>;
    private generateCacheKey;
    clearCache(pattern: string): Promise<void>;
}
export {};
