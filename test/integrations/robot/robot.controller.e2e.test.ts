import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UpdateCommunicationUseCase } from '@/robot/datas/use-cases/update-communication.use-case';
import { AppModule } from '@/app.module';

describe('RobotController', () => {
  let app: INestApplication;
  let updateCommunicationUseCase: UpdateCommunicationUseCase;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    updateCommunicationUseCase = moduleFixture.get<UpdateCommunicationUseCase>(
      UpdateCommunicationUseCase,
    );

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('sendCommunication', () => {
    it('should call updateCommunicationUseCase with the provided communicationData', async () => {
      const mockExecute = jest
        .spyOn(updateCommunicationUseCase, 'execute')
        .mockResolvedValueOnce({ message: 'OK' });

      const communicationData = {
        id: '124123',
        to: 'vss@vss.com',
        from: 'vidav@vidav.com',
        subject: 'Test',
      };

      await request(app.getHttpServer())
        .post('/robot/communication/send')
        .send(communicationData)
        .expect(201);

      expect(mockExecute).toHaveBeenCalledWith(communicationData);
    });
  });
});
