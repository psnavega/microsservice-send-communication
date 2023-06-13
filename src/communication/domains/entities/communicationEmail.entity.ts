import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

export class CommunicationEmailEntity implements ICreateCommunication {
  @IsNotEmpty()
  @IsMongoId()
  id?: string;

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

  @IsString()
  provider: string;

  @IsDate()
  requestedAt: Date;

  @IsDate()
  sendedAt: Date;

  @IsDate()
  updatedAt?: Date;
}
