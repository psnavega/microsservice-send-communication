import { Injectable } from '@nestjs/common';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationRepository } from '../repositories/communication.repository';
import { ObjectId } from 'mongodb';
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
      throw new Error('Missing params');
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

    const objId = new ObjectId(id);

    return {
      id: objId,
      message: 'Comunicação agendada com sucesso',
    };
  }
}
