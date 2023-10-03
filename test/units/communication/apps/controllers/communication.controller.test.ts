import { CommunicationController } from '@/communication/apps/controllers/communication.controller';
import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { GetCommunicationUseCase } from '@/communication/datas/use-cases/get-communication.usecase';
import { CreateCommunicationUseCase } from '@/communication/datas/use-cases/create-communication.usecase';
import { PubSubService } from '@/infra/pubsub/pubsub.service';
import {
  CommunicationStatus,
  CommunicationType,
} from '@/shared/enums/communicationType.enum';
import { NotFoundException } from '@nestjs/common';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';

describe('CommunicationController', () => {
  let communicationController: CommunicationController;
  let createCommunicationUseCase: CreateCommunicationUseCase;
  let getCommunicationUseCase: GetCommunicationUseCase;
  let communicationRepository: CommunicationRepository;

  beforeEach(() => {
    createCommunicationUseCase = new CreateCommunicationUseCase(
      communicationRepository,
    );

    getCommunicationUseCase = new GetCommunicationUseCase(
      communicationRepository,
    );

    communicationController = new CommunicationController(
      createCommunicationUseCase,
      getCommunicationUseCase,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the execute send communication use case', async () => {
    const executeSpy = jest
      .spyOn(createCommunicationUseCase, 'execute')
      .mockResolvedValue({
        id: '12345',
        message: 'Comunicação agendada com sucesso',
      });

    const type = 'email' as CommunicationType;

    const communicationData = {
      from: 'sender@sender.com',
      to: 'receiver@receiver.com',
      subject: 'Test Subject',
      body: 'Test Body',
    };

    const result = await communicationController.sendCommunication(
      CommunicationType.EMAIL,
      communicationData,
    );

    expect(executeSpy).toHaveBeenCalledWith({ communicationData, type });
    expect(result).toEqual({
      id: '12345',
      message: 'Comunicação agendada com sucesso',
    });
  });

  it('should throw a NotFoundException for any other type', async () => {
    const communicationData = {
      to: 'receiver@receiver.com',
      body: 'Test Body',
    };

    const invalidType = 'other' as CommunicationType;

    await expect(
      communicationController.sendCommunication(invalidType, communicationData),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should call the execute get communication use case', async () => {
    const id = '12345';

    const executeSpy = jest
      .spyOn(getCommunicationUseCase, 'execute')
      .mockResolvedValue({
        id: '12345',
        to: 'fulano@vss.com',
        body: 'Essa mensagem é de teste',
        type: CommunicationType.SMS,
        status: CommunicationStatus.SCHEDULED,
        requestedAt: new Date(),
        sendedAt: new Date(),
        updatedAt: new Date(),
      } as CommunicationSMSEntity);

    const result = (await communicationController.getCommunication(
      id,
    )) as CommunicationSMSEntity;

    expect(executeSpy).toHaveBeenCalledWith({ id });
    expect(result.id).toBe('12345');
  });
});
