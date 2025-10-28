// MongoDB delivery log model
export interface DeliveryLog {
  timestamp: string;
  status: 'sent' | 'error';
  channel: string;
  destination: string;
  message: string;
}
