import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

export class CommunicationSMSEntity implements ICreateCommunication {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

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

  @IsString()
  provider: string;

  @IsDate()
  requestedAt: Date;

  @IsDate()
  sendedAt: Date;

  @IsDate()
  updatedAt?: Date;
}
