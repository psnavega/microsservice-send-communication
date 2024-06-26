import { Module } from '@nestjs/common';
import { CommunicationController } from './apps/controllers/communication.controller';
import { CommunicationRepository } from './datas/repositories/communication.repository';
import { CreateCommunicationUseCase } from './datas/use-cases/create-communication.usecase';
import { PubSubModule } from '@/infra/pubsub/pubsub.module';
import { GetCommunicationUseCase } from './datas/use-cases/get-communication.usecase';
import { LoggerModule } from '@/infra/logger/logger.module';
import { CommunicationStrategy } from './datas/strategies/communicationStrategy.strategy';
import { SendgridService } from '@/infra/sendgrid/sendgrid.service';
import { SendgridModule } from '@/infra/sendgrid/sendgrid.module';
import { ZenviaModule } from '@/infra/zenvia/zenvia.module';
import { ZenviaService } from '@/infra/zenvia/zenvia.service';
import { MailService } from '@sendgrid/mail';
import { PubSub } from '@google-cloud/pubsub';
import { MailTrapService } from '@/infra/mailtrap/mailtrap.service';
import { PgMaisService } from '@/infra/pgmais/pgmais.service';
import { PrismaService } from '@/infra/config/prisma/prisma.service';

@Module({
  imports: [PubSubModule, LoggerModule, SendgridModule, ZenviaModule],
  controllers: [CommunicationController],
  providers: [
    CommunicationRepository,
    CreateCommunicationUseCase,
    GetCommunicationUseCase,
    CommunicationStrategy,
    SendgridService,
    ZenviaService,
    MailService,
    PubSub,
    MailTrapService,
    PgMaisService,
    PrismaService,
  ],
})
export class CommunicationModule {}
