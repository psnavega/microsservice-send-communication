import { Db, MongoClient, Collection } from 'mongodb';

export class MongoService {
  private db: Db | null;
  private client: MongoClient | null;

  constructor() {
    this.db = null;
    this.client = null;
  }

  private async connect() {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/vss_local';
    try {
      const mongoClient = await MongoClient.connect(mongoUrl);

      this.client = mongoClient;
      this.db = mongoClient.db();
    } catch (error) {
      throw new Error('Cannot connect to mongo');
    }
  }

  async close(force = false) {
    if (!this.db || !this.client) {
      throw new Error('There is no connection');
    }

    await this.client.close(force);
  }

  async getCollection(collectionName: string): Promise<Collection> {
    if (!this.db) {
      await this.connect();
    }
    if (!this.db) {
      throw new Error('Connection lost');
    }
    return this.db.collection(collectionName);
  }
}
