import { Injectable } from '@nestjs/common';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationRepository } from '../repositories/communication.repository';
import { ICommunicationResponse } from '@/communication/domains/interfaces/communicationResponse';

@Injectable()
export class CommunicationEmailUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {}

  async execute({
    from,
    to,
    subject,
    body,
  }: {
    from: string;
    to: string;
    subject: string;
    body: string;
  }): Promise<ICommunicationResponse> {
    if (!to || !body || !subject || !from) {
      throw new Error('Missing required params');
    }

    const obj: CommunicationEmailEntity = {
      from,
      to,
      subject,
      body,
    };

    const { id } = await this.communicationRepository.create({
      obj,
      type: 'email',
    });

    return {
      id,
      message: 'Comunicação agendada com sucesso',
    };
  }
}
