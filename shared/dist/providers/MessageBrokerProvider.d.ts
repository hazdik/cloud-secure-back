import { Connection, Channel } from 'amqplib';
export interface MessageBrokerProvider {
    getConnection(): Promise<Connection>;
    createChannel(): Promise<Channel>;
    closeConnection(): Promise<void>;
}
export declare class RabbitMQProvider implements MessageBrokerProvider {
    private static instance;
    private connection;
    private configProvider;
    private constructor();
    static getInstance(): RabbitMQProvider;
    getConnection(): Promise<Connection>;
    createChannel(): Promise<Channel>;
    closeConnection(): Promise<void>;
}
