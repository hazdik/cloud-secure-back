import { Channel, Connection } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { MessageBrokerProvider } from '../providers/MessageBrokerProvider';
import { Message, ExchangeTypes, MessageQueues, RoutingKeys } from '../types/messaging.types';

export class MessagingService {
  private channel: Channel | null = null;
  private connection: Connection | null = null;

  constructor(private messageBrokerProvider: MessageBrokerProvider) {}

  async initialize() {
  this.connection = await this.messageBrokerProvider.getConnection();
  if (!this.connection) throw new Error('Connection not initialized');
  this.channel = await this.connection.createChannel();
    await this.setupExchanges();
    await this.setupQueues();
  }

  private async setupExchanges() {
    if (!this.channel) throw new Error('Channel not initialized');

    // Setup exchanges with type 'topic' for flexible routing
    for (const exchange of Object.values(ExchangeTypes)) {
      await this.channel.assertExchange(exchange, 'topic', { durable: true });
    }
  }

  private async setupQueues() {
    if (!this.channel) throw new Error('Channel not initialized');

    // Setup queues and bind them to appropriate exchanges
    await this.channel.assertQueue(MessageQueues.USER_EVENTS, { durable: true });
    await this.channel.assertQueue(MessageQueues.DATA_EVENTS, { durable: true });
    await this.channel.assertQueue(MessageQueues.NOTIFICATION_EVENTS, { durable: true });
    await this.channel.assertQueue(MessageQueues.SECURITY_EVENTS, { durable: true });

    // Bind queues to exchanges with routing patterns
    await this.channel.bindQueue(
      MessageQueues.USER_EVENTS,
      ExchangeTypes.USER_EXCHANGE,
      'user.*'
    );
    await this.channel.bindQueue(
      MessageQueues.DATA_EVENTS,
      ExchangeTypes.DATA_EXCHANGE,
      'data.*'
    );
    await this.channel.bindQueue(
      MessageQueues.NOTIFICATION_EVENTS,
      ExchangeTypes.NOTIFICATION_EXCHANGE,
      'notification.*'
    );
    await this.channel.bindQueue(
      MessageQueues.SECURITY_EVENTS,
      ExchangeTypes.SECURITY_EXCHANGE,
      'security.*'
    );
  }

  async publish<T>(
    exchange: ExchangeTypes,
    routingKey: RoutingKeys,
    data: T,
    metadata: { userId?: string; correlationId?: string } = {}
  ) {
    if (!this.channel) throw new Error('Channel not initialized');

    const message: Message<T> = {
      id: uuidv4(),
      timestamp: new Date(),
      type: routingKey,
      payload: data,
      metadata: {
        ...metadata,
        serviceId: process.env.SERVICE_ID || 'unknown'
      }
    };

    return this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
        correlationId: metadata.correlationId || uuidv4()
      }
    );
  }

  async subscribe<T>(
    queue: MessageQueues,
    handler: (message: Message<T>) => Promise<void>
  ) {
    if (!this.channel) throw new Error('Channel not initialized');

    await this.channel.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const message: Message<T> = JSON.parse(msg.content.toString());
        await handler(message);
        this.channel?.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
        // Reject the message and requeue if it's a temporary failure
        this.channel?.nack(msg, false, true);
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