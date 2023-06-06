import { SendCommunicationUseCase } from '@/communication/datas/use-cases/create-communication.usecase';
import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import {
  CommunicationStatus,
  CommunicationType,
} from '@/shared/enums/communicationType.enum';
import { PubSubService } from '@/infra/pubsub/pubsub.service';
import { MongoService } from '@/infra/mongo/mongo.service';
import { LoggerService } from '@/infra/logger/logger.service';

describe('sendCommunicationUseCase', () => {
  let sendCommunicationUseCase: SendCommunicationUseCase;
  let communicationRepository: CommunicationRepository;
  let queueService: PubSubService;
  let mongoService: MongoService;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();

    mongoService = new MongoService(loggerService);

    communicationRepository = new CommunicationRepository(mongoService);

    queueService = new PubSubService(loggerService);

    sendCommunicationUseCase = new SendCommunicationUseCase(
      communicationRepository,
      queueService,
      loggerService,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const communicationData = {
    to: 'teste@vss.com',
    from: 'teste@vss.com',
    subject: 'teste',
    body: 'teste',
    id: '6474119518269cd61e381473',
    requestedAt: new Date(),
    sendedAt: new Date(),
    updatedAt: new Date(),
    type: CommunicationType.EMAIL,
    status: CommunicationStatus.SCHEDULED,
  };

  it('should call queueService', async () => {
    const executeSpyOn = jest.spyOn(queueService, 'sendMessage');
    const repositorySpyOn = jest
      .spyOn(communicationRepository, 'create')
      .mockResolvedValue({ id: '6474119518269cd61e381473' });

    await sendCommunicationUseCase.execute({
      type: CommunicationType.EMAIL,
      communicationData,
    });

    expect(executeSpyOn).toBeCalled();
    expect(repositorySpyOn).toBeCalled();
  });
});
