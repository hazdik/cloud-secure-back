export interface DatabaseConfig {
    postgres: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    };
    mongodb: {
        uri: string;
        user: string;
        password: string;
    };
}
export interface MessageBrokerConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    vhost: string;
}
export interface CacheConfig {
    host: string;
    port: number;
    password: string;
}
export interface LLMConfig {
    enabled: boolean;
    defaultProvider: string;
    claude: {
        apiKey: string;
        apiUrl: string;
        model: string;
    };
}
export interface ServiceConfig {
    port: number;
    host: string;
}
export interface ConfigProvider {
    getServiceConfig(): ServiceConfig;
    getDatabaseConfig(): DatabaseConfig;
    getMessageBrokerConfig(): MessageBrokerConfig;
    getCacheConfig(): CacheConfig;
    getLLMConfig(): LLMConfig;
}
export declare class ConfigurationProvider implements ConfigProvider {
    private static instance;
    private config;
    private constructor();
    static getInstance(): ConfigurationProvider;
    getServiceConfig(): ServiceConfig;
    getDatabaseConfig(): DatabaseConfig;
    getMessageBrokerConfig(): MessageBrokerConfig;
    getCacheConfig(): CacheConfig;
    getLLMConfig(): LLMConfig;
}
