"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const uuid_1 = require("uuid");
const messaging_types_1 = require("../types/messaging.types");
class MessagingService {
    constructor(messageBrokerProvider) {
        this.messageBrokerProvider = messageBrokerProvider;
        this.channel = null;
        this.connection = null;
    }
    async initialize() {
        this.connection = await this.messageBrokerProvider.getConnection();
        if (!this.connection)
            throw new Error('Connection not initialized');
        this.channel = await this.connection.createChannel();
        await this.setupExchanges();
        await this.setupQueues();
    }
    async setupExchanges() {
        if (!this.channel)
            throw new Error('Channel not initialized');
        // Setup exchanges with type 'topic' for flexible routing
        for (const exchange of Object.values(messaging_types_1.ExchangeTypes)) {
            await this.channel.assertExchange(exchange, 'topic', { durable: true });
        }
    }
    async setupQueues() {
        if (!this.channel)
            throw new Error('Channel not initialized');
        // Setup queues and bind them to appropriate exchanges
        await this.channel.assertQueue(messaging_types_1.MessageQueues.USER_EVENTS, { durable: true });
        await this.channel.assertQueue(messaging_types_1.MessageQueues.DATA_EVENTS, { durable: true });
        await this.channel.assertQueue(messaging_types_1.MessageQueues.NOTIFICATION_EVENTS, { durable: true });
        await this.channel.assertQueue(messaging_types_1.MessageQueues.SECURITY_EVENTS, { durable: true });
        // Bind queues to exchanges with routing patterns
        await this.channel.bindQueue(messaging_types_1.MessageQueues.USER_EVENTS, messaging_types_1.ExchangeTypes.USER_EXCHANGE, 'user.*');
        await this.channel.bindQueue(messaging_types_1.MessageQueues.DATA_EVENTS, messaging_types_1.ExchangeTypes.DATA_EXCHANGE, 'data.*');
        await this.channel.bindQueue(messaging_types_1.MessageQueues.NOTIFICATION_EVENTS, messaging_types_1.ExchangeTypes.NOTIFICATION_EXCHANGE, 'notification.*');
        await this.channel.bindQueue(messaging_types_1.MessageQueues.SECURITY_EVENTS, messaging_types_1.ExchangeTypes.SECURITY_EXCHANGE, 'security.*');
    }
    async publish(exchange, routingKey, data, metadata = {}) {
        if (!this.channel)
            throw new Error('Channel not initialized');
        const message = {
            id: (0, uuid_1.v4)(),
            timestamp: new Date(),
            type: routingKey,
            payload: data,
            metadata: {
                ...metadata,
                serviceId: process.env.SERVICE_ID || 'unknown'
            }
        };
        return this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), {
            persistent: true,
            correlationId: metadata.correlationId || (0, uuid_1.v4)()
        });
    }
    async subscribe(queue, handler) {
        if (!this.channel)
            throw new Error('Channel not initialized');
        await this.channel.consume(queue, async (msg) => {
            var _a, _b;
            if (!msg)
                return;
            try {
                const message = JSON.parse(msg.content.toString());
                await handler(message);
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.ack(msg);
            }
            catch (error) {
                console.error('Error processing message:', error);
                // Reject the message and requeue if it's a temporary failure
                (_b = this.channel) === null || _b === void 0 ? void 0 : _b.nack(msg, false, true);
            }
        });
    }
    async close() {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
    }
}
exports.MessagingService = MessagingService;
