import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';
import { ConfigurationProvider } from '../config/ConfigurationProvider';

export interface CacheProvider {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
  getClient(): RedisClient;
}

export class RedisCacheProvider implements CacheProvider {
  private static instance: RedisCacheProvider;
  private client: RedisClient;
  private configProvider: any;

  private constructor() {
  this.configProvider = ConfigurationProvider.getInstance();
    const config = this.configProvider.getCacheConfig();
    
    this.client = createClient({
      host: config.host,
      port: config.port,
      password: config.password
    });
  }

  public static getInstance(): RedisCacheProvider {
    if (!RedisCacheProvider.instance) {
      RedisCacheProvider.instance = new RedisCacheProvider();
    }
    return RedisCacheProvider.instance;
  }

  public async get(key: string): Promise<string | null> {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  public async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const setAsync = promisify(this.client.set).bind(this.client);
    if (ttlSeconds) {
      // Use setex for Redis TTL
      const setexAsync = promisify((this.client as any).setex).bind(this.client);
      await setexAsync(key, ttlSeconds, value);
    } else {
      await setAsync(key, value);
    }
  }

  public async del(key: string): Promise<void> {
  const delAsync = promisify(this.client.del as (key: string, cb: (err: Error | null, reply: number) => void) => void).bind(this.client);
  await delAsync(key);
  }

  public getClient(): RedisClient {
    return this.client;
  }

  public async disconnect(): Promise<void> {
    const quitAsync = promisify(this.client.quit).bind(this.client);
    await quitAsync();
  }
}