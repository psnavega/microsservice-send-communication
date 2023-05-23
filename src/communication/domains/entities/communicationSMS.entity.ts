import { ICommunicationSMS } from '../interfaces/communicationSMS.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommunicationSMSEntity implements ICommunicationSMS {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
