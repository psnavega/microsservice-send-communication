import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

export class CommunicationEntity implements ICreateCommunication {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsString()
  from?: string;

  @IsString()
  subject?: string;

  @IsString()
  status: string;

  @IsString()
  provider?: string;

  @IsDate()
  requestedAt: Date;

  @IsDate()
  sendedAt: Date;

  @IsDate()
  updatedAt?: Date;
}
