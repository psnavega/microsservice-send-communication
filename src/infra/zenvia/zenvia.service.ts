import { Client, TextContent } from '@zenvia/sdk';
import { Injectable } from '@nestjs/common';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ZenviaService implements ICommunicationStrategy {
  private readonly client: Client;
  private readonly logger: LoggerService;
  constructor(loggerService: LoggerService) {
    this.logger = loggerService;
    const token = process.env.ZENVIA_API_KEY;
    this.client = new Client(token);
  }

  async send({ to, body }: { to: string; body: string }): Promise<void> {
    const sms = this.client.getChannel('sms');
    const content = new TextContent(body);
    try {
      await sms.sendMessage(process.env.ZENVIA_NUMBER, to, content);
    } catch (err) {
      this.logger.error(err, err.trace);
      throw err;
    }
  }
}
