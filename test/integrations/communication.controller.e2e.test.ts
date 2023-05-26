import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { MongoService } from '@/infra/mongo/mongo.service';

describe('CommunicationController (e2e)', () => {
  let app: INestApplication;
  let db: MongoService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    db = new MongoService();
    const collection = await db.getCollection('communication');
    await collection.deleteMany({});
  });

  afterAll(async () => {
    app.close();
    await db.close();
  });

  it('POST /api/email/send should return a response', async () => {
    const communicationData = {
      to: 'test@vss.com',
      from: 'test@vss.com',
      subject: 'Test',
      body: 'Test',
    };

    const response = await request(app.getHttpServer())
      .post('/api/email/send')
      .send(communicationData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
    expect(response.body.id).toBeTruthy();
    expect(response.body.message).toBe('Comunicação agendada com sucesso');
  });

  it('POST /api/sms/send should return a response', async () => {
    const communicationData = {
      to: 'test@vss.com',
      body: 'Test',
    };

    const response = await request(app.getHttpServer())
      .post('/api/sms/send')
      .send(communicationData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
    expect(response.body.id).toBeTruthy();
    expect(response.body.message).toBe('Comunicação agendada com sucesso');
  });

  it('should throw a NotFoundException for an unknown type', async () => {
    const communicationData = {
      to: 'test@vss.com',
      body: 'Test',
    };

    const response = await request(app.getHttpServer())
      .post('/api/unknown/send')
      .send(communicationData)
      .expect(404);

    expect(response.body.message).toEqual('Communication type invalid');
  });
});
