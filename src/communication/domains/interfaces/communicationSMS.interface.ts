import { CommunicationStatus } from '@/shared/enums/communicationType.enum';

export interface ICommunicationSMS {
  to: string;
  body: string;
  type: string;
  status?: CommunicationStatus;
  requestedAt?: Date;
  sendedAt?: Date;
  updatedAt?: Date;
}
