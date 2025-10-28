import { Connection, Channel, connect } from 'amqplib';
import { ConfigurationProvider } from '../config/ConfigurationProvider';

export interface MessageBrokerProvider {
  getConnection(): Promise<Connection>;
  createChannel(): Promise<Channel>;
  closeConnection(): Promise<void>;
}

export class RabbitMQProvider implements MessageBrokerProvider {
  private static instance: RabbitMQProvider;
  private connection: Connection | null = null;
  private configProvider: any;

  private constructor() {
  this.configProvider = ConfigurationProvider.getInstance();
  }

  public static getInstance(): RabbitMQProvider {
    if (!RabbitMQProvider.instance) {
      RabbitMQProvider.instance = new RabbitMQProvider();
    }
    return RabbitMQProvider.instance;
  }

  public async getConnection(): Promise<Connection> {
    if (!this.connection) {
      const config = this.configProvider.getMessageBrokerConfig();
      const url = `amqp://${config.user}:${config.password}@${config.host}:${config.port}${config.vhost}`;
      this.connection = await connect(url);
    }
    return this.connection;
  }

  public async createChannel(): Promise<Channel> {
    const connection = await this.getConnection();
    return connection.createChannel();
  }

  public async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}