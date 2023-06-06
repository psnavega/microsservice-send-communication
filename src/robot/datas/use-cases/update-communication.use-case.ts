import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { CommunicationStrategy } from '@/communication/datas/strategies/communicationStrategy.strategy';
import { LoggerService } from '@/infra/logger/logger.service';
import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCommunicationUseCase {
  private loggerService: LoggerService;
  private communicationRepository: CommunicationRepository;
  private communicationStrategy: CommunicationStrategy;

  constructor(
    communicationRepository: CommunicationRepository,
    loggerService: LoggerService,
    communicationStrategy: CommunicationStrategy,
  ) {
    this.communicationRepository = communicationRepository;
    this.loggerService = loggerService;
    this.communicationStrategy = communicationStrategy;
  }

  async execute(communicationData: any): Promise<any> {
    try {
      await this.communicationStrategy.send(communicationData);

      await this.communicationRepository.update({
        id: communicationData.id,
        fieldsToUpdate: {
          status: CommunicationStatus.SENT,
          updatedAt: new Date(),
          sendedAt: new Date(),
        },
      });
    } catch (err) {
      this.loggerService.error('Error while parsing messageContent: ', err);
      await this.communicationRepository.update({
        id: communicationData.id,
        fieldsToUpdate: {
          status: CommunicationStatus.ERROR,
          statusMessage: err.message,
          updatedAt: new Date(),
          sendedAt: new Date(),
        },
      });
    }
  }
}
