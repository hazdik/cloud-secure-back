import { promisify } from 'util';
import { CacheProvider } from '../providers/CacheProvider';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  ignoreCacheErrors?: boolean;
}

export class CacheService {
  private static instance: CacheService;
  private readonly defaultTTL = 3600; // 1 hour default TTL

  constructor(private cacheProvider: CacheProvider) {}

  public static getInstance(cacheProvider: CacheProvider): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService(cacheProvider);
    }
    return CacheService.instance;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.cacheProvider.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error retrieving key ${key} from cache:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await this.cacheProvider.set(key, serializedValue, options.ttl || this.defaultTTL);
    } catch (error) {
      if (!options.ignoreCacheErrors) {
        throw error;
      }
      console.error(`Error setting cache key ${key}:`, error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.cacheProvider.del(key);
    } catch (error) {
      console.error(`Error deleting cache key ${key}:`, error);
    }
  }

  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    try {
      const cachedValue = await this.get<T>(key);
      if (cachedValue !== null) {
        return cachedValue;
      }

      const freshValue = await fetchFn();
      await this.set(key, freshValue, options);
      return freshValue;
    } catch (error) {
      if (!options.ignoreCacheErrors) {
        throw error;
      }
      return await fetchFn();
    }
  }

  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    const multi = this.cacheProvider.getClient().multi();
    keys.forEach(key => multi.get(key));
    
    const mgetAsync = promisify(multi.exec).bind(multi);
    const results = await mgetAsync();
    
    return results.map(result => {
      if (!result) return null;
      try {
        return JSON.parse(result as string) as T;
      } catch {
        return null;
      }
    });
  }

  async mset<T>(keyValues: { [key: string]: T }, options: CacheOptions = {}): Promise<void> {
    const multi = this.cacheProvider.getClient().multi();
    
    Object.entries(keyValues).forEach(([key, value]) => {
      const serializedValue = JSON.stringify(value);
      if (options.ttl) {
        multi.setex(key, options.ttl, serializedValue);
      } else {
        multi.set(key, serializedValue);
      }
    });

    const execAsync = promisify(multi.exec).bind(multi);
    await execAsync();
  }

  generateKey(...parts: (string | number)[]): string {
    return parts.join(':');
  }
}