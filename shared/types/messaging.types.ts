export enum MessageQueues {
  USER_EVENTS = 'user_events',
  DATA_EVENTS = 'data_events',
  NOTIFICATION_EVENTS = 'notification_events',
  SECURITY_EVENTS = 'security_events'
}

export enum ExchangeTypes {
  USER_EXCHANGE = 'user_exchange',
  DATA_EXCHANGE = 'data_exchange',
  NOTIFICATION_EXCHANGE = 'notification_exchange',
  SECURITY_EXCHANGE = 'security_exchange'
}

export enum RoutingKeys {
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',
  DATA_CREATED = 'data.created',
  DATA_UPDATED = 'data.updated',
  DATA_DELETED = 'data.deleted',
  SECURITY_ALERT = 'security.alert',
  NOTIFICATION_REQUEST = 'notification.request'
}

export interface Message<T> {
  id: string;
  timestamp: Date;
  type: string;
  payload: T;
  metadata: {
    correlationId?: string;
    userId?: string;
    serviceId: string;
  };
}

export interface UserEvent {
  userId: string;
  action: 'created' | 'updated' | 'deleted';
  data: any;
}

export interface DataEvent {
  objectId: string;
  userId: string;
  action: 'created' | 'updated' | 'deleted';
  data: any;
}

export interface SecurityEvent {
  userId: string;
  eventType: string;
  severity: 'low' | 'medium' | 'high';
  details: any;
}

export interface NotificationEvent {
  userId: string;
  type: 'email' | 'push' | 'sms';
  template: string;
  data: any;
}