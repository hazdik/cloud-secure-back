import { CacheService, CacheOptions } from '../services/CacheService';

export function Cacheable(
  keyPrefix: string,
  options: CacheOptions = {}
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
  if (!('cacheProvider' in this)) throw new Error('cacheProvider not found on instance');
  const cacheService = CacheService.getInstance(this['cacheProvider'] as import('../providers/CacheProvider').CacheProvider);
      const cacheKey = cacheService.generateKey(keyPrefix, ...args);
      return cacheService.getOrSet(
        cacheKey,
        () => originalMethod.apply(this, args),
        options
      );
    };

    return descriptor;
  };
}

export function CacheEvict(keyPattern: string): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
  if (!('cacheProvider' in this)) throw new Error('cacheProvider not found on instance');
  const result = await originalMethod.apply(this, args);
  const cacheService = CacheService.getInstance(this['cacheProvider'] as import('../providers/CacheProvider').CacheProvider);
  await cacheService.delete(keyPattern);
  return result;
    };

    return descriptor;
  };
}

export function CachePut(
  keyPrefix: string,
  options: CacheOptions = {}
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
  if (!('cacheProvider' in this)) throw new Error('cacheProvider not found on instance');
  const result = await originalMethod.apply(this, args);
  const cacheService = CacheService.getInstance(this['cacheProvider'] as import('../providers/CacheProvider').CacheProvider);
  const cacheKey = cacheService.generateKey(keyPrefix, ...args);
  await cacheService.set(cacheKey, result, options);
  return result;
    };

    return descriptor;
  };
}