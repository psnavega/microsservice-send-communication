import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MongoClient, Collection, Db } from 'mongodb';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(private readonly loggerService: LoggerService) {}
  onModuleDestroy() {
    this.close();
  }

  onModuleInit() {
    this.connect();
  }

  async connect() {
    if (this.db) {
      return this.db;
    }

    const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/vss_local';

    try {
      const mongoClient = await MongoClient.connect(mongoUrl);

      this.client = mongoClient;
      this.db = mongoClient.db();

      return this.db;
    } catch (error) {
      throw new Error(`Cannot connect to MongoDB: ${error.message}`);
    }
  }

  async close(force = false) {
    if (!this.client) {
      throw new Error('There is no connection');
    }

    await this.client.close(force);
    this.client = null;
    this.db = null;
  }

  async getCollection(collectionName: string): Promise<Collection> {
    if (!this.db) {
      await this.connect();
    }

    return this.db.collection(collectionName);
  }
}
