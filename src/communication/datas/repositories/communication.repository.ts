import { Injectable } from '@nestjs/common';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';
import { MongoService } from '@/infra/config/mongo/mongo.service';
import { CommunicationRepositoryInterface } from '@/communication/domains/repositories/communication.repository';

@Injectable()
export class CommunicationRepository
  implements CommunicationRepositoryInterface
{
  private collection: any;

  constructor(private db: MongoService) {}

  async create({
    obj,
    type,
  }: {
    obj: CommunicationEmailEntity | CommunicationSMSEntity;
    type: 'email' | 'sms';
  }): Promise<{ id: string }> {
    try {
      const collection = await this.db.getCollection('communication');

      const { insertedId } = await collection.insertOne({
        ...obj,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const id = insertedId.toHexString();

      return { id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
