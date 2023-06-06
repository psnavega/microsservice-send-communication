import { Inject, Injectable } from '@nestjs/common';
import { CommunicationRepository } from '../repositories/communication.repository';
import {
  CommunicationStatus,
  CommunicationType,
} from '@/shared/enums/communicationType.enum';
import { CreateCommunicationEmailDto } from '../dtos/create-communicationEmail.dto';
import { CreateCommunicationSMSDto } from '../dtos/create-communicationSMS.dto';
import { PubSubService } from '@/infra/pubsub/pubsub.service';
import { IPubSubService } from '@/shared/interfaces/pubSub.interface';
import { LoggerService } from '@/infra/logger/logger.service';

@Injectable()
export class SendCommunicationUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
    @Inject(PubSubService) private readonly queueService: IPubSubService,
    private readonly loggerService: LoggerService,
  ) {}

  async execute({
    type,
    communicationData,
  }: {
    type: CommunicationType;
    communicationData: CreateCommunicationEmailDto | CreateCommunicationSMSDto;
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

    try {
      await this.queueService.sendMessage({ message: { ...obj, id } });
    } catch (err) {
      this.loggerService.error('Error while sending message to queue: ', err);
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
