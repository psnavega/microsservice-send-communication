import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { MailService } from '@sendgrid/mail';

@Module({
  imports: [LoggerModule],
  providers: [MailService],
  exports: [],
})
export class SendgridModule {}
