import { CommunicationController } from '@/communication/apps/controllers/communication.controller';
import { GooglePubSubService } from '@/communication/apps/services/send-communicationQueue';
import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { GetCommunicationUseCase } from '@/communication/datas/use-cases/get-communication.usecase';
import { SendCommunicationUseCase } from '@/communication/datas/use-cases/send-communication.usecase';
import { CommunicationType } from '@/shared/enums/communicationType.enum';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('CommunicationController', () => {
  let communicationController: CommunicationController;
  let sendCommunicationUseCase: SendCommunicationUseCase;
  let getCommunicationUseCase: GetCommunicationUseCase;
  let communicationRepository: CommunicationRepository;
  let queueService: GooglePubSubService;

  beforeEach(() => {
    sendCommunicationUseCase = new SendCommunicationUseCase(
      communicationRepository,
      queueService,
    );

    communicationController = new CommunicationController(
      sendCommunicationUseCase,
      getCommunicationUseCase,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the execute send communication use case', async () => {
    const executeSpy = jest
      .spyOn(sendCommunicationUseCase, 'execute')
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
});
