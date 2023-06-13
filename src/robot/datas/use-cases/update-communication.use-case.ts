import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { CommunicationStrategy } from '@/communication/datas/strategies/communicationStrategy.strategy';
import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCommunicationUseCase {
  private communicationRepository: CommunicationRepository;
  private communicationStrategy: CommunicationStrategy;

  constructor(
    communicationRepository: CommunicationRepository,
    communicationStrategy: CommunicationStrategy,
  ) {
    this.communicationRepository = communicationRepository;
    this.communicationStrategy = communicationStrategy;
  }

  async execute(
    communicationData: ICreateCommunication,
  ): Promise<{ message: string }> {
    try {
      const { provider } = await this.communicationStrategy.send(
        communicationData,
      );

      await this.communicationRepository.update({
        id: communicationData.id,
        fieldsToUpdate: {
          provider,
          status: CommunicationStatus.SENT,
          updatedAt: new Date(),
          sendedAt: new Date(),
        },
      });

      return {
        message: 'OK',
      };
    } catch (err) {
      await this.communicationRepository.update({
        id: communicationData.id,
        fieldsToUpdate: {
          status: CommunicationStatus.ERROR,
          statusMessage: err.message,
          updatedAt: new Date(),
          sendedAt: new Date(),
        },
      });
      throw err;
    }
  }
}
