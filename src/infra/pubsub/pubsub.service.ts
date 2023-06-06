import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';
import { IPubSubService } from '@/shared/interfaces/pubSub.interface';
import { PubSub } from '@google-cloud/pubsub';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class PubSubService implements IPubSubService {
  private topic: any;
  private pubsub: any;
  private loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;
    this.pubsub = new PubSub({
      projectId: process.env.GOOGLE_PROJECT_ID,
      keyFile: process.env.GOOGLE_KEY_FILE,
    });
    this.topic = this.pubsub.topic(process.env.GOOGLE_PUBSUB_TOPIC_NAME);
  }

  async sendMessage({
    message,
  }: {
    message: CommunicationEmailEntity | CommunicationSMSEntity;
  }): Promise<void> {
    try {
      const messageFormatted = JSON.stringify({ ...message });

      await this.topic.publishMessage({
        data: Buffer.from(messageFormatted),
      });
    } catch (err) {
      this.loggerService.error('Error while publishing message: ', err);
      throw new Error('Error on publishing message');
    }
  }
}
export { PubSub };
