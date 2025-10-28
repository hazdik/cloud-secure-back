import { config } from 'dotenv';
import { join } from 'path';

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

export class ConfigurationProvider implements ConfigProvider {
  private static instance: ConfigurationProvider;
  private config: any;

  private constructor() {
    // Load environment variables
    config({ path: join(__dirname, '../../.env') });
    this.config = process.env;
  }

  public static getInstance(): ConfigurationProvider {
    if (!ConfigurationProvider.instance) {
      ConfigurationProvider.instance = new ConfigurationProvider();
    }
    return ConfigurationProvider.instance;
  }

  public getServiceConfig(): ServiceConfig {
    return {
      port: parseInt(this.config.SERVICE_PORT || '4000'),
      host: this.config.SERVICE_HOST || 'localhost',
    };
  }

  public getDatabaseConfig(): DatabaseConfig {
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

  public getMessageBrokerConfig(): MessageBrokerConfig {
    return {
      host: this.config.RABBITMQ_HOST,
      port: parseInt(this.config.RABBITMQ_PORT),
      user: this.config.RABBITMQ_USER,
      password: this.config.RABBITMQ_PASSWORD,
      vhost: this.config.RABBITMQ_VHOST,
    };
  }

  public getCacheConfig(): CacheConfig {
    return {
      host: this.config.REDIS_HOST,
      port: parseInt(this.config.REDIS_PORT),
      password: this.config.REDIS_PASSWORD,
    };
  }

  public getLLMConfig(): LLMConfig {
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