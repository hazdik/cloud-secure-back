import { MessageBrokerProvider } from '../providers/MessageBrokerProvider';
import { Message, ExchangeTypes, MessageQueues, RoutingKeys } from '../types/messaging.types';
export declare class MessagingService {
    private messageBrokerProvider;
    private channel;
    private connection;
    constructor(messageBrokerProvider: MessageBrokerProvider);
    initialize(): Promise<void>;
    private setupExchanges;
    private setupQueues;
    publish<T>(exchange: ExchangeTypes, routingKey: RoutingKeys, data: T, metadata?: {
        userId?: string;
        correlationId?: string;
    }): Promise<boolean>;
    subscribe<T>(queue: MessageQueues, handler: (message: Message<T>) => Promise<void>): Promise<void>;
    close(): Promise<void>;
}
