import { Inject, Injectable } from '@nestjs/common';
import { CommunicationRepository } from '../repositories/communication.repository';
import {
  CommunicationStatus,
  CommunicationType,
} from '@/shared/enums/communicationType.enum';
import { IPubSubService } from '@/shared/interfaces/pubSub.interface';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';
import { PubSubServiceMock } from '../../../../mocks/pubsub.service.mock';
import { PubSubService } from '@/infra/pubsub/pubsub.service';

@Injectable()
export class CreateCommunicationUseCase {
  private queueService: IPubSubService;

  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {
    if (process.env.NODE_ENV === 'local') {
      this.queueService = new PubSubServiceMock();
    } else {
      this.queueService = new PubSubService();
    }
  }

  async execute({
    type,
    communicationData,
  }: {
    type: CommunicationType;
    communicationData: ICreateCommunication;
  }): Promise<{ id: string; message: string }> {
    const obj = {
      ...communicationData,
      type,
      status: CommunicationStatus.SCHEDULED,
      requestedAt: new Date(),
      sendedAt: new Date(),
      updatedAt: new Date(),
    };

    const { id } = await this.communicationRepository.create({ obj });

    Object.assign(obj, { id });

    try {
      await this.queueService.sendMessage({
        message: obj,
      });
    } catch (err) {
      await this.communicationRepository.update({
        id,
        fieldsToUpdate: {
          status: CommunicationStatus.ERROR,
          statusMessage: err.message,
          updatedAt: new Date(),
        },
      });
      throw err;
    }

    return {
      id,
      message: 'Comunicação agendada com sucesso',
    };
  }
}
