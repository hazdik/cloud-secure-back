import { PrismaClient } from '@prisma/client';
import { MongoClient, Collection } from 'mongodb';
import { DatabaseProvider } from '@cloud-secure/shared';
import { UserProfile, SecurityLog, NotificationSettings } from '../types/mongodb.types';

export class DataDatabaseService {
  private prisma: PrismaClient;
  private mongoClient!: MongoClient;
  private readonly dbName = 'cloud_secure';

  constructor(databaseProvider: DatabaseProvider) {
    this.prisma = databaseProvider.getPrismaClient();
    this.initMongo(databaseProvider);
  }

  private async initMongo(databaseProvider: DatabaseProvider) {
    this.mongoClient = await databaseProvider.getMongoClient();
  }

  // MongoDB Collections
  private get userProfilesCollection(): Collection<UserProfile> {
    return this.mongoClient.db(this.dbName).collection('userProfiles');
  }

  private get securityLogsCollection(): Collection<SecurityLog> {
    return this.mongoClient.db(this.dbName).collection('securityLogs');
  }

  private get notificationSettingsCollection(): Collection<NotificationSettings> {
    return this.mongoClient.db(this.dbName).collection('notificationSettings');
  }

  // Prisma Methods
  async createDataObject(data: {
    userId: string;
    type: string;
    name: string;
    content: any;
    metadata?: any;
    isPublic?: boolean;
  }) {
    return this.prisma.dataObject.create({
      data
    });
  }

  async getDataObjectById(id: string) {
    return this.prisma.dataObject.findUnique({
      where: { id },
      include: { permissions: true }
    });
  }

  // MongoDB Methods
  async createUserProfile(profile: Omit<UserProfile, '_id'>) {
    return this.userProfilesCollection.insertOne(profile as UserProfile);
  }

  async getUserProfile(userId: string) {
    return this.userProfilesCollection.findOne({ userId });
  }

  async logSecurityEvent(log: Omit<SecurityLog, '_id'>) {
    return this.securityLogsCollection.insertOne(log as SecurityLog);
  }

  async getSecurityLogs(userId: string, limit = 10) {
    return this.securityLogsCollection
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  }

  async updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>) {
    return this.notificationSettingsCollection.updateOne(
      { userId },
      { $set: settings },
      { upsert: true }
    );
  }

  async getNotificationSettings(userId: string) {
    return this.notificationSettingsCollection.findOne({ userId });
  }
}