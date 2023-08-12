import { Injectable } from '@nestjs/common';
import { MongoClient, Collection, Db } from 'mongodb';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MongoService {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;
    this.connect();
  }

  async connect() {
    if (this.db) {
      return this.db;
    }

    const mongoUrl = 'mongodb://mongo:27017/vss_local';

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
