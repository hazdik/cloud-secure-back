"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQProvider = void 0;
const amqplib_1 = require("amqplib");
const ConfigurationProvider_1 = require("../config/ConfigurationProvider");
class RabbitMQProvider {
    constructor() {
        this.connection = null;
        this.configProvider = ConfigurationProvider_1.ConfigurationProvider.getInstance();
    }
    static getInstance() {
        if (!RabbitMQProvider.instance) {
            RabbitMQProvider.instance = new RabbitMQProvider();
        }
        return RabbitMQProvider.instance;
    }
    async getConnection() {
        if (!this.connection) {
            const config = this.configProvider.getMessageBrokerConfig();
            const url = `amqp://${config.user}:${config.password}@${config.host}:${config.port}${config.vhost}`;
            this.connection = await (0, amqplib_1.connect)(url);
        }
        return this.connection;
    }
    async createChannel() {
        const connection = await this.getConnection();
        return connection.createChannel();
    }
    async closeConnection() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}
exports.RabbitMQProvider = RabbitMQProvider;
