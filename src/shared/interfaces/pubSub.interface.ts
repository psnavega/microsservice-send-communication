import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';

export interface IPubSubService {
  sendMessage({
    message,
  }: {
    message: CommunicationEmailEntity | CommunicationSMSEntity;
  }): Promise<void>;
}
