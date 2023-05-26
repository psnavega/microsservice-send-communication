import { ICommunicationSMS } from '../interfaces/communicationSMS.interface';
import { ICommunicationEmail } from '../interfaces/communicationEmail.interface';

export interface CommunicationRepositoryInterface {
  create({
    obj,
    type,
  }: {
    obj: ICommunicationEmail | ICommunicationSMS;
    type: 'sms' | 'email';
  }): Promise<{ id: string }>;

  get({ id }: { id: string }): Promise<any>;
}
