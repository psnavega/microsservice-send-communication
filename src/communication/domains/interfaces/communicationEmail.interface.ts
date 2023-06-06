import { CommunicationStatus } from '@/shared/enums/communicationType.enum';

export interface ICommunicationEmail {
  id?: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  type: string;
  status?: CommunicationStatus;
  requestedAt?: Date;
  sendedAt?: Date;
  updatedAt?: Date;
}
