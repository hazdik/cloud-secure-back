"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProviderImpl = void 0;
const client_1 = require("@prisma/client");
const mongodb_1 = require("mongodb");
const ConfigurationProvider_1 = require("../config/ConfigurationProvider");
class DatabaseProviderImpl {
    constructor() {
        this.mongoClient = null;
        this.configProvider = ConfigurationProvider_1.ConfigurationProvider.getInstance();
        this.prismaClient = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!DatabaseProviderImpl.instance) {
            DatabaseProviderImpl.instance = new DatabaseProviderImpl();
        }
        return DatabaseProviderImpl.instance;
    }
    getPrismaClient() {
        return this.prismaClient;
    }
    async getMongoClient() {
        if (!this.mongoClient) {
            const config = this.configProvider.getDatabaseConfig();
            this.mongoClient = await mongodb_1.MongoClient.connect(config.mongodb.uri);
        }
        return this.mongoClient;
    }
    async disconnect() {
        await this.prismaClient.$disconnect();
        if (this.mongoClient) {
            await this.mongoClient.close();
        }
    }
}
exports.DatabaseProviderImpl = DatabaseProviderImpl;
