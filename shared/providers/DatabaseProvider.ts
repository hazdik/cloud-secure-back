import { PrismaClient } from '@prisma/client';
import { MongoClient } from 'mongodb';
import { ConfigurationProvider } from '../config/ConfigurationProvider';

export interface DatabaseProvider {
  getPrismaClient(): PrismaClient;
  getMongoClient(): Promise<MongoClient>;
}

export class DatabaseProviderImpl implements DatabaseProvider {
  private static instance: DatabaseProviderImpl;
  private prismaClient: PrismaClient;
  private mongoClient: MongoClient | null = null;
  private configProvider: any;

  private constructor() {
  this.configProvider = ConfigurationProvider.getInstance();
    this.prismaClient = new PrismaClient();
  }

  public static getInstance(): DatabaseProviderImpl {
    if (!DatabaseProviderImpl.instance) {
      DatabaseProviderImpl.instance = new DatabaseProviderImpl();
    }
    return DatabaseProviderImpl.instance;
  }

  public getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }

  public async getMongoClient(): Promise<MongoClient> {
    if (!this.mongoClient) {
      const config = this.configProvider.getDatabaseConfig();
      this.mongoClient = await MongoClient.connect(config.mongodb.uri);
    }
    return this.mongoClient;
  }

  public async disconnect(): Promise<void> {
    await this.prismaClient.$disconnect();
    if (this.mongoClient) {
      await this.mongoClient.close();
    }
  }
}