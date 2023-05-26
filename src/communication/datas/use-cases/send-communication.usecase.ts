import { Injectable } from '@nestjs/common';
import { CommunicationRepository } from '../repositories/communication.repository';
import {
  CommunicationStatus,
  CommunicationType,
} from '@/shared/enums/communicationType.enum';
import { GooglePubSubService } from '@/communication/apps/services/send-communicationQueue';
import { CreateCommunicationEmailDto } from '../dtos/create-communicationEmail.dto';
import { CreateCommunicationSMSDto } from '../dtos/create-communicationSMS.dto';

@Injectable()
export class SendCommunicationUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
    private readonly queueService: GooglePubSubService,
  ) {}

  async execute({
    type,
    communicationData,
  }: {
    type: CommunicationType;
    communicationData: CreateCommunicationEmailDto | CreateCommunicationSMSDto;
  }): Promise<{ id: string; message: string }> {
    await this.queueService.sendMessage({ message: communicationData });

    const { id } = await this.communicationRepository.create({
      obj: {
        ...communicationData,
        type,
        status: CommunicationStatus.SCHEDULED,
        requestedAt: new Date(),
        sendedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      id,
      message: 'Comunicação agendada com sucesso',
    };
  }
}
