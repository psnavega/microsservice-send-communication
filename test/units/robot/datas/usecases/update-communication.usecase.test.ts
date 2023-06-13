import { UpdateCommunicationUseCase } from '@/robot/datas/use-cases/update-communication.use-case';
import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { CommunicationStatus } from '@/shared/enums/communicationType.enum';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';

describe('UpdateCommunicationUseCase', () => {
  let updateCommunicationUseCase: UpdateCommunicationUseCase;
  let communicationRepository: CommunicationRepository;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    updateCommunicationUseCase = moduleFixture.get<UpdateCommunicationUseCase>(
      UpdateCommunicationUseCase,
    );
    communicationRepository = moduleFixture.get<CommunicationRepository>(
      CommunicationRepository,
    );
  });

  it('should update communication status to SENT', async () => {
    const updateSpy = jest
      .spyOn(communicationRepository, 'update')
      .mockResolvedValueOnce({});

    const communicationData = {
      id: '123456',
      to: 'vss@vss.com',
      body: 'Body default',
    };

    await updateCommunicationUseCase.execute(communicationData);

    expect(updateSpy).toHaveBeenCalledWith({
      id: communicationData.id,
      fieldsToUpdate: {
        status: CommunicationStatus.SENT,
        updatedAt: expect.any(Date),
        sendedAt: expect.any(Date),
      },
    });
  });
});
