import { MongoService } from '@/infra/mongo/mongo.service';

import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';
import { ObjectId } from 'mongodb';
import { CommunicationStatus } from '@/shared/enums/communicationType.enum';

let communicationRepository: CommunicationRepository;
let db: MongoService;

beforeAll(async () => {
  db = new MongoService();
  communicationRepository = new CommunicationRepository(db);
});

afterEach(async () => {
  const collection = await db.getCollection('communication');
  await collection.deleteMany({});
});

afterAll(async () => {
  await db.close();
});

describe('CommunicationRepository', () => {
  it('should create a new register of Email at database', async () => {
    const communicationData: CommunicationEmailEntity = {
      to: 'receiver@receiver.com',
      body: 'Test Body',
      subject: 'My subject',
      from: 'My from',
      type: 'email',
      status: CommunicationStatus.SCHEDULED,
      requestedAt: new Date(),
      sendedAt: new Date(),
    };

    const { id } = await communicationRepository.create({
      obj: communicationData,
    });

    const insertedDocument = await (
      await db.getCollection('communication')
    ).findOne({
      _id: new ObjectId(id),
    });

    expect(insertedDocument).toBeDefined();
    expect(insertedDocument.type).toBe('email');
    expect(insertedDocument.to).toBe(communicationData.to);
    expect(insertedDocument.body).toBe(communicationData.body);
    expect(insertedDocument.from).toBe(communicationData.from);
    expect(insertedDocument.subject).toBe(communicationData.subject);
    expect(insertedDocument.requestedAt).toBeDefined();
    expect(insertedDocument.sendedAt).toBeDefined();
  });
});

it('should create a new register of SMS at database', async () => {
  const communicationData: CommunicationSMSEntity = {
    to: 'receiver@receiver.com',
    body: 'Test Body',
    type: 'sms',
    status: CommunicationStatus.SCHEDULED,
    requestedAt: new Date(),
    sendedAt: new Date(),
  };

  const { id } = await communicationRepository.create({
    obj: communicationData,
  });

  const insertedDocument = await (
    await db.getCollection('communication')
  ).findOne({
    _id: new ObjectId(id),
  });

  expect(insertedDocument).toBeDefined();
  expect(insertedDocument.type).toBe('sms');
  expect(insertedDocument.to).toBe(communicationData.to);
  expect(insertedDocument.body).toBe(communicationData.body);
  expect(insertedDocument.requestedAt).toBeDefined();
  expect(insertedDocument.sendedAt).toBeDefined();
});
