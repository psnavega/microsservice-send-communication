import { Injectable } from '@nestjs/common';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationRepository } from '../repositories/communication.repository';
import { ObjectId } from 'mongodb';

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
  }): Promise<{ id: ObjectId; message: string }> {
    if (!to || !body || !subject || !from) {
      throw new Error('Missing required fields');
    }
    const obj: CommunicationEmailEntity = {
      from,
      to,
      subject,
      body,
    };
    const result = await this.communicationRepository.create(obj);

    return {
      id: result,
      message: 'Comunicação agendada com sucesso',
    };
  }
}
