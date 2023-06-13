import { IPubSubService } from '@/shared/interfaces/pubSub.interface';
import { PubSub } from '@google-cloud/pubsub';
import { Injectable } from '@nestjs/common';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

@Injectable()
export class PubSubService implements IPubSubService {
  private topic: any;
  private pubsub: any;

  constructor() {
    this.pubsub = new PubSub({
      projectId: process.env.GOOGLE_PROJECT_ID,
    });
    this.topic = this.pubsub.topic(process.env.GOOGLE_PUBSUB_TOPIC_NAME);
  }

  async sendMessage({
    message,
  }: {
    message: ICreateCommunication;
  }): Promise<void> {
    try {
      const messageFormatted = JSON.stringify({ ...message });

      await this.topic.publishMessage({
        data: Buffer.from(messageFormatted),
      });
    } catch (err) {
      throw new Error('Error on publishing message');
    }
  }
}
export { PubSub };
