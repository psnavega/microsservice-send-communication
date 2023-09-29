import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { LoggerModule } from '../logger/logger.module';
import { MailTrapService } from '../mailtrap/mailtrap.service';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: SendgridService,
      useFactory: () => {
        if (process.env.NODE_ENV === 'local') {
          return new MailTrapService();
        } else {
          return new SendgridService(new MailService());
        }
      },
    },
  ],
  exports: [SendgridService],
})
export class SendgridModule {}
