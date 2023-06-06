import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import { MongoService } from '@/infra/mongo/mongo.service';
import { GetCommunicationUseCase } from '@/communication/datas/use-cases/get-communication.usecase';
import { LoggerService } from '@/infra/logger/logger.service';

describe('getCommunicationUseCase', () => {
  let getCommunicationUseCase: GetCommunicationUseCase;
  let communicationRepository: CommunicationRepository;
  let mongoService: MongoService;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();

    mongoService = new MongoService(loggerService);

    communicationRepository = new CommunicationRepository(mongoService);

    getCommunicationUseCase = new GetCommunicationUseCase(
      communicationRepository,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call get function at repository', async () => {
    const repositorySpyOn = jest
      .spyOn(communicationRepository, 'get')
      .mockResolvedValue({
        id: '123',
        status: CommunicationStatus.SCHEDULED,
        to: 'teste@vss.com',
        from: 'teste@vss.com',
        subject: 'teste',
        body: 'teste',
        type: 'email',
        requestedAt: new Date(),
        sendedAt: new Date(),
        updatedAt: new Date(),
      });

    const id = '123';

    await getCommunicationUseCase.execute({ id });

    expect(repositorySpyOn).toBeCalled();
    expect(repositorySpyOn).toBeCalledWith({ id });
  });
});
