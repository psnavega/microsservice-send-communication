import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { Logger } from '@nestjs/common';

@Injectable()
export class MongoService {
  private db: Db;
  private readonly client: MongoClient;
  private readonly logger: Logger;

  constructor() {
    this.client = new MongoClient(process.env.DB_URL);
    this.logger = new Logger(MongoService.name);
  }

  private async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();
    } catch (error) {
      this.logger.error('Failed to connect to MongoDB');
      throw error;
    }
  }

  async getCollection(collectionName: string) {
    await this.connect();
    if (!this.db) {
      throw new Error('Connection lost');
    }
    return this.db.collection(collectionName);
  }
}
