import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';

@Injectable()
export class SendgridService implements ICommunicationStrategy {
  constructor(private readonly mailService: MailService) {
    this.mailService.setApiKey(
      process.env.MS_COMMUNICATION_MS_COMMUNICATION_SENGDRID_API_KEY,
    );
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
  }): Promise<{ provider: string }> {
    const emailData = {
      to,
      from,
      subject,
      html: body,
    };

    try {
      await this.mailService.send(emailData);
      return { provider: 'sendgrid' };
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
