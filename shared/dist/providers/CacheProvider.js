"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheProvider = void 0;
const redis_1 = require("redis");
const util_1 = require("util");
const ConfigurationProvider_1 = require("../config/ConfigurationProvider");
class RedisCacheProvider {
    constructor() {
        this.configProvider = ConfigurationProvider_1.ConfigurationProvider.getInstance();
        const config = this.configProvider.getCacheConfig();
        this.client = (0, redis_1.createClient)({
            host: config.host,
            port: config.port,
            password: config.password
        });
    }
    static getInstance() {
        if (!RedisCacheProvider.instance) {
            RedisCacheProvider.instance = new RedisCacheProvider();
        }
        return RedisCacheProvider.instance;
    }
    async get(key) {
        const getAsync = (0, util_1.promisify)(this.client.get).bind(this.client);
        return getAsync(key);
    }
    async set(key, value, ttlSeconds) {
        const setAsync = (0, util_1.promisify)(this.client.set).bind(this.client);
        if (ttlSeconds) {
            // Use setex for Redis TTL
            const setexAsync = (0, util_1.promisify)(this.client.setex).bind(this.client);
            await setexAsync(key, ttlSeconds, value);
        }
        else {
            await setAsync(key, value);
        }
    }
    async del(key) {
        const delAsync = (0, util_1.promisify)(this.client.del).bind(this.client);
        await delAsync(key);
    }
    getClient() {
        return this.client;
    }
    async disconnect() {
        const quitAsync = (0, util_1.promisify)(this.client.quit).bind(this.client);
        await quitAsync();
    }
}
exports.RedisCacheProvider = RedisCacheProvider;
