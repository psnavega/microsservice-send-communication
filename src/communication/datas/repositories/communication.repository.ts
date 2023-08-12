import { Injectable } from '@nestjs/common';
import { MongoService } from '@/infra/mongo/mongo.service';
import { CommunicationRepositoryInterface } from '@/communication/domains/repositories/communication.repository';
import { ObjectId } from 'mongodb';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

@Injectable()
export class CommunicationRepository
  implements CommunicationRepositoryInterface
{
  private collection: any;

  constructor(private readonly db: MongoService) {}

  async create({
    obj,
  }: {
    obj: ICreateCommunication;
  }): Promise<{ id: string }> {
    const collection = await this.db.getCollection('communication');

    const { insertedId } = await collection.insertOne({
      ...obj,
    });

    return { id: insertedId.toHexString() };
  }

  async get({ id }: { id: string }): Promise<any> {
    const collection = await this.db.getCollection('communication');

    const response = await collection.findOne({ _id: new ObjectId(id) });

    return { response };
  }

  async update({
    id,
    fieldsToUpdate,
  }: {
    id: string;
    fieldsToUpdate: { [key: string]: any };
  }): Promise<any> {
    const collection = await this.db.getCollection('communication');
    const updateObject = { $set: {} };

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      updateObject.$set[key] = value;
    }

    const response = await collection.updateOne(
      { _id: new ObjectId(id) },
      updateObject,
    );

    return { response };
  }
}
