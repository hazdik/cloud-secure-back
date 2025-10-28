// MongoDB Schema Types

export interface UserProfile {
  _id: string;
  userId: string;
  avatarUrl?: string;
  bio?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
  metadata: {
    lastLogin: Date;
    loginCount: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface SecurityLog {
  _id: string;
  userId: string;
  action: 'login' | 'logout' | 'password_change' | 'profile_update';
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  details?: Record<string, any>;
}

export interface NotificationSettings {
  _id: string;
  userId: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  types: {
    security: boolean;
    updates: boolean;
    marketing: boolean;
  };
  schedules: {
    quiet: {
      start: string; // HH:mm format
      end: string;   // HH:mm format
    };
    timezone: string;
  };
}