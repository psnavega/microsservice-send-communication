import { Injectable } from '@nestjs/common';
import { CommunicationRepository } from '../repositories/communication.repository';
import {
  CommunicationStatus,
  CommunicationType,
} from '@/shared/enums/communicationType.enum';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';
import { PubSubService } from '@/infra/pubsub/pubsub.service';

@Injectable()
export class CreateCommunicationUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
    private readonly pubSubService: PubSubService,
  ) {}

  async execute({
    type,
    communicationData,
  }: {
    type: CommunicationType;
    communicationData: ICreateCommunication;
  }): Promise<{ id: string; message: string }> {
    const createCommunicationDto = this.mountDto({
      communicationData,
      type,
    });

    const registerCreated = await this.createRegister({
      createCommunicationDto,
      type,
    });

    try {
      await this.pubSubService.sendMessage({
        message: createCommunicationDto,
      });
    } catch (err) {
      await this.communicationRepository.updateErrorCase({
        id: registerCreated.id,
        status: CommunicationStatus.ERROR,
        description: err.message,
        sendedAt: new Date(),
      });
      throw err;
    }

    return {
      id: registerCreated.id,
      message: 'Comunicação agendada com sucesso',
    };
  }

  private mountDto({
    communicationData,
    type,
  }: {
    communicationData: ICreateCommunication;
    type: CommunicationType;
  }) {
    return {
      ...communicationData,
      type,
      status: CommunicationStatus.SCHEDULED,
      requestedAt: new Date(),
      sendedAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private async createRegister({
    createCommunicationDto,
    type,
  }: {
    createCommunicationDto: ICreateCommunication;
    type: CommunicationType;
  }) {
    const { id } = await this.communicationRepository.create({
      type,
      createCommunicationDto,
    });

    return this.findRegisterWithId({ createCommunicationDto, id });
  }

  private findRegisterWithId({
    createCommunicationDto,
    id,
  }: {
    createCommunicationDto: ICreateCommunication;
    id: string;
  }) {
    return Object.assign(createCommunicationDto, { id });
  }
}
