import { CommunicationType } from '@/shared/enums/communicationType.enum';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';
import { CommunicationEntity } from '../entities/communication.entity';

export interface CommunicationRepositoryInterface {
  create({
    createCommunicationDto,
    type,
  }: {
    createCommunicationDto: ICreateCommunication;
    type: CommunicationType;
  }): Promise<CommunicationEntity>;

  get({ id }: { id: string }): Promise<CommunicationEntity>;

  updateSuccessCase({
    id,
    provider,
    status,
    sendedAt,
  }: {
    id: string;
    provider: string;
    status: string;
    sendedAt: Date;
  }): Promise<CommunicationEntity>;

  updateErrorCase({
    id,
    status,
    sendedAt,
  }: {
    id: string;
    status: string;
    sendedAt: Date;
  }): Promise<CommunicationEntity>;
}
