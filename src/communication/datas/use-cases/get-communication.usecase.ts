import { Injectable } from '@nestjs/common';
import { CommunicationRepository } from '../repositories/communication.repository';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

@Injectable()
export class GetCommunicationUseCase {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<ICreateCommunication> {
    return this.communicationRepository.get({ id });
  }
}
