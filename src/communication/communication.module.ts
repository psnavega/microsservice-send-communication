import { Module } from '@nestjs/common';
import { CommunicationController } from './apps/controllers/communication.controller';
import { CommunicationEmailUseCase } from './datas/use-cases/create-communicationEmail.usecase';
import { CommunicationSMSUseCase } from './datas/use-cases/create-communicationSMS.usecase';
import { CommunicationRepository } from './datas/repositories/communication.repository';
import { MongoModule } from '@/infra/config/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [CommunicationController],
  providers: [
    CommunicationSMSUseCase,
    CommunicationEmailUseCase,
    CommunicationRepository,
  ],
})
export class CommunicationModule {}
