import { CommunicationController } from '@/communication/apps/controllers/communication.controller';
import { CommunicationEmailUseCase } from '@/communication/datas/use-cases/create-communicationEmail.usecase';
import { CommunicationSMSUseCase } from '@/communication/datas/use-cases/create-communicationSMS.usecase';
import { NotFoundException } from '@nestjs/common';

describe('CommunicationController', () => {
  let communicationController: CommunicationController;
  let communicationEmailUseCase: CommunicationEmailUseCase;
  let communicationSMSUseCase: CommunicationSMSUseCase;

  beforeEach(() => {
    communicationEmailUseCase = new CommunicationEmailUseCase(null);
    communicationSMSUseCase = new CommunicationSMSUseCase(null);

    communicationController = new CommunicationController(
      communicationEmailUseCase,
      communicationSMSUseCase,
    );
  });

  it('should call an send email use case', async () => {
    const executeSpy = jest
      .spyOn(communicationEmailUseCase, 'execute')
      .mockResolvedValue({
        id: '12345',
        message: 'Comunicação agendada com sucesso',
      });

    const communicationData = {
      from: 'sender@sender.com',
      to: 'receiver@receiver.com',
      subject: 'Test Subject',
      body: 'Test Body',
    };

    const result = await communicationController.sendCommunication(
      'email',
      communicationData,
    );

    expect(executeSpy).toHaveBeenCalledWith(communicationData);
    expect(result).toEqual({
      id: '12345',
      message: 'Comunicação agendada com sucesso',
    });
  });

  it('should call send a SMS use case', async () => {
    const executeSpy = jest
      .spyOn(communicationSMSUseCase, 'execute')
      .mockResolvedValue({
        id: '12345',
        message: 'Comunicação agendada com sucesso',
      });

    const communicationData = {
      to: 'receiver@receiver.com',
      body: 'Test Body',
    };

    const result = await communicationController.sendCommunication(
      'sms',
      communicationData,
    );

    expect(executeSpy).toHaveBeenCalledWith(communicationData);
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

    const invalidType = 'other' as 'sms' | 'email';

    await expect(
      communicationController.sendCommunication(invalidType, communicationData),
    ).rejects.toThrowError(NotFoundException);
  });
});
