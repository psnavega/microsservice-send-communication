import { Module } from '@nestjs/common';
import { RobotController } from './apps/controllers/robot.controller';
import { CommunicationRepository } from '@/communication/datas/repositories/communication.repository';
import { LoggerModule } from '@/infra/logger/logger.module';
import { UpdateCommunicationUseCase } from './datas/use-cases/update-communication.use-case';
import { CommunicationModule } from '@/communication/communication.module';
import { MongoModule } from '@/infra/mongo/mongo.module';
import { SendgridService } from '@/infra/sendgrid/sendgrid.service';
import { SendgridModule } from '@/infra/sendgrid/sendgrid.module';
import { CommunicationStrategy } from '@/communication/datas/strategies/communicationStrategy.strategy';
import { ZenviaService } from '@/infra/zenvia/zenvia.service';
import { ZenviaModule } from '@/infra/zenvia/zenvia.module';
import { MailService } from '@sendgrid/mail';
import { MailTrapService } from '@/infra/mailtrap/mailtrap.service';
import { PgMaisService } from '@/infra/pgmais/pgmais.service';

@Module({
  imports: [
    LoggerModule,
    CommunicationModule,
    MongoModule,
    SendgridModule,
    ZenviaModule,
  ],
  controllers: [RobotController],
  providers: [
    UpdateCommunicationUseCase,
    CommunicationRepository,
    SendgridService,
    ZenviaService,
    CommunicationStrategy,
    MailService,
    MailTrapService,
    PgMaisService,
  ],
})
export class RobotModule {}
