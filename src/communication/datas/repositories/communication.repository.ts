import { Injectable } from '@nestjs/common';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';
import { MongoService } from '@/infra/config/mongo/mongo.service';
import { CommunicationRepositoryInterface } from '@/communication/domains/repositories/communication.repository';
import { ObjectId } from 'mongodb';

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
  }): Promise<ObjectId> {
    try {
      const result = await (
        await this.db.getCollection('communication')
      ).insertOne({
        ...obj,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return result.insertedId;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
