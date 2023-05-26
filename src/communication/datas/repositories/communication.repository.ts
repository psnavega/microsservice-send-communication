import { Injectable } from '@nestjs/common';
import { MongoService } from '@/infra/mongo/mongo.service';
import { CommunicationRepositoryInterface } from '@/communication/domains/repositories/communication.repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommunicationRepository
  implements CommunicationRepositoryInterface
{
  private collection: any;

  constructor(private db: MongoService) {}

  async create({ obj }: { obj: any }): Promise<{ id: string }> {
    try {
      const collection = await this.db.getCollection('communication');

      const { insertedId } = await collection.insertOne({
        ...obj,
      });

      const id = insertedId.toHexString();

      return { id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async get({ id }: { id: any }): Promise<any> {
    try {
      const collection = await this.db.getCollection('communication');

      const response = await collection.findOne({ _id: new ObjectId(id) });

      return { response };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
