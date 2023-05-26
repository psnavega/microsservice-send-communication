import { IPubSubService } from '@/shared/interfaces/pubSub.interface';
import { PubSub } from '@google-cloud/pubsub';

import { PubSubService } from '@/infra/pubsub/pubsub.service';
import { CreateCommunicationEmailDto } from '@/communication/datas/dtos/create-communicationEmail.dto';
import { CreateCommunicationSMSDto } from '@/communication/datas/dtos/create-communicationSMS.dto';

export class GooglePubSubService implements IPubSubService {
  private config: PubSubService;

  constructor(config: PubSubService) {
    this.config = config;
  }

  async sendMessage({
    message,
  }: {
    message: CreateCommunicationEmailDto | CreateCommunicationSMSDto;
  }): Promise<void> {
    try {
      const pubsub = new PubSub({ projectId: this.config.getProjectId() });

      const topic = pubsub.topic(this.config.getTopicName());

      const messageFormated = JSON.stringify(message);

      await topic.publishMessage({ data: Buffer.from(messageFormated) });
      console.log('Message sent successfully.');
    } catch (err) {
      console.error(err);
      throw new Error('Error on publish message');
    }
  }
}
