import { CommunicationSMSUseCase } from '@/communication/datas/use-cases/create-communicationSMS.usecase';
import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { MongoService } from '@/infra/config/mongo/mongo.service';

describe('CommunicationSMSUseCase', () => {
  let communicationEmailUseCase: CommunicationSMSUseCase;
  let communicationRepository: CommunicationRepository;
  let mongoService: MongoService;

  beforeEach(() => {
    mongoService = new MongoService();
    communicationRepository = new CommunicationRepository(mongoService);
    communicationEmailUseCase = new CommunicationSMSUseCase(
      communicationRepository,
    );
  });

  it('should create a new email communication', async () => {
    const communicationRepositorySpy = jest
      .spyOn(communicationRepository, 'create')
      .mockResolvedValue({
        id: '12345',
      });

    const to = 'receiver@receiver.com';
    const body = 'Test Body';

    const result = await communicationEmailUseCase.execute({
      to,
      body,
    });

    expect(communicationRepositorySpy).toHaveBeenCalledWith({
      obj: {
        to,
        body,
      },
      type: 'sms',
    });
    expect(result).toEqual({
      id: '12345',
      message: 'Comunicação agendada com sucesso',
    });
  });

  it('should throw an error if some or more than one param is missing', async () => {
    const body = 'Test Body';
    const to = '';

    try {
      await communicationEmailUseCase.execute({
        to,
        body,
      });
    } catch (err) {
      expect(err).toEqual(new Error('Missing required params'));
    }
  });
});
