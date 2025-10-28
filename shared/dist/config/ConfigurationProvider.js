"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationProvider = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
class ConfigurationProvider {
    constructor() {
        // Load environment variables
        (0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '../../.env') });
        this.config = process.env;
    }
    static getInstance() {
        if (!ConfigurationProvider.instance) {
            ConfigurationProvider.instance = new ConfigurationProvider();
        }
        return ConfigurationProvider.instance;
    }
    getServiceConfig() {
        return {
            port: parseInt(this.config.SERVICE_PORT || '4000'),
            host: this.config.SERVICE_HOST || 'localhost',
        };
    }
    getDatabaseConfig() {
        return {
            postgres: {
                host: this.config.POSTGRES_HOST,
                port: parseInt(this.config.POSTGRES_PORT),
                user: this.config.POSTGRES_USER,
                password: this.config.POSTGRES_PASSWORD,
                database: this.config.POSTGRES_DB,
            },
            mongodb: {
                uri: this.config.MONGO_URI,
                user: this.config.MONGO_USER,
                password: this.config.MONGO_PASSWORD,
            },
        };
    }
    getMessageBrokerConfig() {
        return {
            host: this.config.RABBITMQ_HOST,
            port: parseInt(this.config.RABBITMQ_PORT),
            user: this.config.RABBITMQ_USER,
            password: this.config.RABBITMQ_PASSWORD,
            vhost: this.config.RABBITMQ_VHOST,
        };
    }
    getCacheConfig() {
        return {
            host: this.config.REDIS_HOST,
            port: parseInt(this.config.REDIS_PORT),
            password: this.config.REDIS_PASSWORD,
        };
    }
    getLLMConfig() {
        return {
            enabled: (this.config.LLM_ENABLED || 'false').toLowerCase() === 'true',
            defaultProvider: this.config.LLM_DEFAULT_PROVIDER || 'claude',
            claude: {
                apiKey: this.config.CLAUDE_API_KEY || '',
                apiUrl: this.config.CLAUDE_API_URL || '',
                model: this.config.CLAUDE_MODEL || 'claude-sonnet-3.5',
            },
        };
    }
}
exports.ConfigurationProvider = ConfigurationProvider;
