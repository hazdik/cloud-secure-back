import { CacheOptions } from '../services/CacheService';
export declare function Cacheable(keyPrefix: string, options?: CacheOptions): MethodDecorator;
export declare function CacheEvict(keyPattern: string): MethodDecorator;
export declare function CachePut(keyPrefix: string, options?: CacheOptions): MethodDecorator;
