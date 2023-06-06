import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { LoggerService } from '../logger/logger.service';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';

@Injectable()
export class SendgridService implements ICommunicationStrategy {
  constructor(
    private readonly logger: LoggerService,
    private readonly mailService: MailService,
  ) {
    this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send({
    to,
    body,
    from,
    subject,
  }: {
    to: string;
    body: string;
    from: string;
    subject: string;
  }): Promise<void> {
    const emailData = {
      to,
      from,
      subject,
      text: body,
    };

    try {
      await this.mailService.send(emailData);
    } catch (error) {
      this.logger.error(error, error.trace);
      throw new Error('Failed to send email');
    }
  }
}
