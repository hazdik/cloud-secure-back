import { PrismaClient } from '@prisma/client';
import { MongoClient } from 'mongodb';
export interface DatabaseProvider {
    getPrismaClient(): PrismaClient;
    getMongoClient(): Promise<MongoClient>;
}
export declare class DatabaseProviderImpl implements DatabaseProvider {
    private static instance;
    private prismaClient;
    private mongoClient;
    private configProvider;
    private constructor();
    static getInstance(): DatabaseProviderImpl;
    getPrismaClient(): PrismaClient;
    getMongoClient(): Promise<MongoClient>;
    disconnect(): Promise<void>;
}
