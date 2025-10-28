"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const util_1 = require("util");
class CacheService {
    constructor(cacheProvider) {
        this.cacheProvider = cacheProvider;
        this.defaultTTL = 3600; // 1 hour default TTL
    }
    static getInstance(cacheProvider) {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService(cacheProvider);
        }
        return CacheService.instance;
    }
    async get(key) {
        try {
            const data = await this.cacheProvider.get(key);
            if (!data)
                return null;
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Error retrieving key ${key} from cache:`, error);
            return null;
        }
    }
    async set(key, value, options = {}) {
        try {
            const serializedValue = JSON.stringify(value);
            await this.cacheProvider.set(key, serializedValue, options.ttl || this.defaultTTL);
        }
        catch (error) {
            if (!options.ignoreCacheErrors) {
                throw error;
            }
            console.error(`Error setting cache key ${key}:`, error);
        }
    }
    async delete(key) {
        try {
            await this.cacheProvider.del(key);
        }
        catch (error) {
            console.error(`Error deleting cache key ${key}:`, error);
        }
    }
    async getOrSet(key, fetchFn, options = {}) {
        try {
            const cachedValue = await this.get(key);
            if (cachedValue !== null) {
                return cachedValue;
            }
            const freshValue = await fetchFn();
            await this.set(key, freshValue, options);
            return freshValue;
        }
        catch (error) {
            if (!options.ignoreCacheErrors) {
                throw error;
            }
            return await fetchFn();
        }
    }
    async mget(keys) {
        const multi = this.cacheProvider.getClient().multi();
        keys.forEach(key => multi.get(key));
        const mgetAsync = (0, util_1.promisify)(multi.exec).bind(multi);
        const results = await mgetAsync();
        return results.map(result => {
            if (!result)
                return null;
            try {
                return JSON.parse(result);
            }
            catch (_a) {
                return null;
            }
        });
    }
    async mset(keyValues, options = {}) {
        const multi = this.cacheProvider.getClient().multi();
        Object.entries(keyValues).forEach(([key, value]) => {
            const serializedValue = JSON.stringify(value);
            if (options.ttl) {
                multi.setex(key, options.ttl, serializedValue);
            }
            else {
                multi.set(key, serializedValue);
            }
        });
        const execAsync = (0, util_1.promisify)(multi.exec).bind(multi);
        await execAsync();
    }
    generateKey(...parts) {
        return parts.join(':');
    }
}
exports.CacheService = CacheService;
