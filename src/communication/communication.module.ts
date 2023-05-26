import { Module } from '@nestjs/common';
import { CommunicationController } from './apps/controllers/communication.controller';
import { CommunicationRepository } from './datas/repositories/communication.repository';
import { MongoModule } from '@/infra/mongo/mongo.module';
import { SendCommunicationUseCase } from './datas/use-cases/send-communication.usecase';
import { PubSubModule } from '@/infra/pubsub/pubsub.module';
import { GooglePubSubService } from './apps/services/send-communicationQueue';
import { GetCommunicationUseCase } from './datas/use-cases/get-communication.usecase';

@Module({
  imports: [MongoModule, PubSubModule],
  controllers: [CommunicationController],
  providers: [
    CommunicationRepository,
    SendCommunicationUseCase,
    GetCommunicationUseCase,
    GooglePubSubService,
  ],
})
export class CommunicationModule {}
