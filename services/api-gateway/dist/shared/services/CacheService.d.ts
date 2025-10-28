import { CacheProvider } from '../providers/CacheProvider';
export interface CacheOptions {
    ttl?: number;
    ignoreCacheErrors?: boolean;
}
export declare class CacheService {
    private cacheProvider;
    private static instance;
    private readonly defaultTTL;
    constructor(cacheProvider: CacheProvider);
    static getInstance(cacheProvider: CacheProvider): CacheService;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
    delete(key: string): Promise<void>;
    getOrSet<T>(key: string, fetchFn: () => Promise<T>, options?: CacheOptions): Promise<T>;
    mget<T>(keys: string[]): Promise<(T | null)[]>;
    mset<T>(keyValues: {
        [key: string]: T;
    }, options?: CacheOptions): Promise<void>;
    generateKey(...parts: (string | number)[]): string;
}
