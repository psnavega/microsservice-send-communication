import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { CommunicationStrategy } from '@/communication/datas/strategies/communicationStrategy.strategy';
import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCommunicationUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
    private readonly communicationStrategy: CommunicationStrategy,
  ) {}

  async execute(
    communicationData: ICreateCommunication,
  ): Promise<{ message: string }> {
    try {
      const { provider } = await this.communicationStrategy.send(
        communicationData,
      );

      await this.updateCommunicationStatusSuccess({
        id: communicationData.id,
        provider,
      });

      return {
        message: 'OK',
      };
    } catch (err) {
      await this.updateCommunicationStatusError({
        id: communicationData.id,
        status: CommunicationStatus.ERROR,
        sendedAt: new Date(),
        description: err.message,
      });
      throw err;
    }
  }

  private async updateCommunicationStatusSuccess({
    id,
    provider,
  }: {
    id: string;
    provider: string;
  }) {
    await this.communicationRepository.updateSuccessCase({
      id,
      provider,
      status: CommunicationStatus.SENT,
      sendedAt: new Date(),
    });

    return provider;
  }

  private async updateCommunicationStatusError({
    id,
    status,
    sendedAt,
    description,
  }: {
    id: string;
    status: string;
    sendedAt: Date;
    description: string;
  }) {
    return this.communicationRepository.updateErrorCase({
      id,
      status,
      sendedAt,
      description,
    });
  }
}
