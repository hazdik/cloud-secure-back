import { RedisClient } from 'redis';
export interface CacheProvider {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    getClient(): RedisClient;
}
export declare class RedisCacheProvider implements CacheProvider {
    private static instance;
    private client;
    private configProvider;
    private constructor();
    static getInstance(): RedisCacheProvider;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    getClient(): RedisClient;
    disconnect(): Promise<void>;
}
