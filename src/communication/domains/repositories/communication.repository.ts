import { ICommunicationSMS } from '../interfaces/communicationSMS.interface';
import { ICommunicationEmail } from '../interfaces/communicationEmail.interface';
import { ObjectId } from 'mongodb';

export interface CommunicationRepositoryInterface {
  create(obj: ICommunicationEmail | ICommunicationSMS): Promise<ObjectId>;
}
