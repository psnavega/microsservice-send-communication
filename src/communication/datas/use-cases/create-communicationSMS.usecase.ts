import { Injectable } from '@nestjs/common';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';
import { CommunicationRepository } from '../repositories/communication.repository';
import { ObjectId } from 'mongodb';

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
  }): Promise<{ id: ObjectId; message: string }> {
    if (!to || !body) {
      throw new Error('Missing required fields');
    }

    const obj: CommunicationSMSEntity = {
      to,
      body,
    };

    const result = await this.communicationRepository.create(obj);

    return {
      id: result,
      message: 'Comunicação agendada com sucesso',
    };
  }
}
