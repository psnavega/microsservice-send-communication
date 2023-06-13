import { Client, TextContent } from '@zenvia/sdk';
import { Injectable } from '@nestjs/common';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';

@Injectable()
export class ZenviaService implements ICommunicationStrategy {
  private readonly client: Client;
  constructor() {
    const token = process.env.ZENVIA_API_KEY;
    this.client = new Client(token);
  }

  async send({
    to,
    body,
  }: {
    to: string;
    body: string;
  }): Promise<{ provider: string }> {
    const sms = this.client.getChannel('sms');
    const content = new TextContent(body);
    try {
      await sms.sendMessage(process.env.ZENVIA_NUMBER, to, content);
      return { provider: 'zenvia' };
    } catch (err) {
      throw err;
    }
  }
}
