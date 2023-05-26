import { Injectable } from '@nestjs/common';
import { CommunicationRepository } from '../repositories/communication.repository';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';

@Injectable()
export class GetCommunicationUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {}

  async execute({
    id,
  }: {
    id: string;
  }): Promise<CommunicationEmailEntity | CommunicationSMSEntity> {
    const { response } = await this.communicationRepository.get({ id });

    return response;
  }
}
