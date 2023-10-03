import { Injectable } from '@nestjs/common';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailTrapService implements ICommunicationStrategy {
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
      const transport = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAIL_TRAP_USER,
          pass: process.env.MAIL_TRAP_PASS,
        },
      });

      await transport.sendMail(emailData);

      return { provider: 'MailTrap' };
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
