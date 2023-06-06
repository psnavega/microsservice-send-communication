import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import { ICommunicationSMS } from '../interfaces/communicationSMS.interface';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CommunicationSMSEntity implements ICommunicationSMS {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsEnum(CommunicationStatus)
  status: CommunicationStatus;

  @IsDate()
  requestedAt: Date;

  @IsDate()
  sendedAt: Date;

  @IsDate()
  updatedAt?: Date;
}
