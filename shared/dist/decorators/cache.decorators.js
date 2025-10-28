"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachePut = exports.CacheEvict = exports.Cacheable = void 0;
const CacheService_1 = require("../services/CacheService");
function Cacheable(keyPrefix, options = {}) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            if (!('cacheProvider' in this))
                throw new Error('cacheProvider not found on instance');
            const cacheService = CacheService_1.CacheService.getInstance(this['cacheProvider']);
            const cacheKey = cacheService.generateKey(keyPrefix, ...args);
            return cacheService.getOrSet(cacheKey, () => originalMethod.apply(this, args), options);
        };
        return descriptor;
    };
}
exports.Cacheable = Cacheable;
function CacheEvict(keyPattern) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            if (!('cacheProvider' in this))
                throw new Error('cacheProvider not found on instance');
            const result = await originalMethod.apply(this, args);
            const cacheService = CacheService_1.CacheService.getInstance(this['cacheProvider']);
            await cacheService.delete(keyPattern);
            return result;
        };
        return descriptor;
    };
}
exports.CacheEvict = CacheEvict;
function CachePut(keyPrefix, options = {}) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            if (!('cacheProvider' in this))
                throw new Error('cacheProvider not found on instance');
            const result = await originalMethod.apply(this, args);
            const cacheService = CacheService_1.CacheService.getInstance(this['cacheProvider']);
            const cacheKey = cacheService.generateKey(keyPrefix, ...args);
            await cacheService.set(cacheKey, result, options);
            return result;
        };
        return descriptor;
    };
}
exports.CachePut = CachePut;
