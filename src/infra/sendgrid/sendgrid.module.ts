import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    SendgridService,
    {
      provide: MailService,
      useValue: new MailService(),
    },
  ],
  exports: [SendgridService],
})
export class SendgridModule {}
