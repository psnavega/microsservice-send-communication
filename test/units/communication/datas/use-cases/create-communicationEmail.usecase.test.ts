import { CommunicationEmailUseCase } from '@/communication/datas/use-cases/create-communicationEmail.usecase';
import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { MongoService } from '@/infra/config/mongo/mongo.service';

describe('CommunicationEmailUseCase', () => {
  let communicationEmailUseCase: CommunicationEmailUseCase;
  let communicationRepository: CommunicationRepository;
  let mongoService: MongoService;

  beforeEach(() => {
    mongoService = new MongoService();
    communicationRepository = new CommunicationRepository(mongoService);
    communicationEmailUseCase = new CommunicationEmailUseCase(
      communicationRepository,
    );
  });

  it('should create a new email communication', async () => {
    const communicationRepositorySpy = jest
      .spyOn(communicationRepository, 'create')
      .mockResolvedValue({
        id: '12345',
      });

    const from = 'sender@sender.com';
    const to = 'receiver@receiver.com';
    const subject = 'Test Subject';
    const body = 'Test Body';

    const result = await communicationEmailUseCase.execute({
      from,
      to,
      subject,
      body,
    });

    expect(communicationRepositorySpy).toHaveBeenCalledWith({
      obj: {
        from,
        to,
        subject,
        body,
      },
      type: 'email',
    });
    expect(result).toEqual({
      id: '12345',
      message: 'Comunicação agendada com sucesso',
    });
  });

  it('should throw an error if some or more than one param is missing', async () => {
    const from = '';
    const subject = 'Test Subject';
    const body = 'Test Body';
    const to = '';

    try {
      await communicationEmailUseCase.execute({
        from,
        subject,
        body,
        to,
      });
    } catch (err) {
      expect(err).toEqual(new Error('Missing required params'));
    }
  });
});
