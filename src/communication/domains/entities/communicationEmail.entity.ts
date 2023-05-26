import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import { ICommunicationEmail } from '../interfaces/communicationEmail.interface';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CommunicationEmailEntity implements ICommunicationEmail {
  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

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
