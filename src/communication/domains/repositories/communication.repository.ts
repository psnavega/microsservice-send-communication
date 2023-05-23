import { ICommunicationSMS } from '../interfaces/communicationSMS.interface';
import { ICommunicationEmail } from '../interfaces/communicationEmail.interface';
import { ObjectId } from 'mongodb';

export interface CommunicationRepositoryInterface {
  create({
    obj,
    type,
  }: {
    obj: ICommunicationEmail | ICommunicationSMS;
    type: 'sms' | 'email';
  }): Promise<ObjectId>;
}
