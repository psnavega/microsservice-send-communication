import { Injectable } from '@nestjs/common';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';
import { CommunicationRepository } from '../repositories/communication.repository';

@Injectable()
export class CommunicationSMSUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {}

  async execute({
    to,
    body,
  }: {
    to: string;
    body: string;
  }): Promise<{ id: string; message: string }> {
    if (!to || !body) {
      throw new Error('Missing required params');
    }

    const obj: CommunicationSMSEntity = {
      to,
      body,
    };

    const { id } = await this.communicationRepository.create({
      obj,
      type: 'sms',
    });

    return {
      id,
      message: 'Comunicação agendada com sucesso',
    };
  }
}
