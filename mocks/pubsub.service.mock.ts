import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { IPubSubService } from '@/shared/interfaces/pubSub.interface';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';
import { Buffer } from 'buffer';

@Injectable()
export class PubSubServiceMock implements IPubSubService {
  async sendMessage({
    message,
  }: {
    message: ICreateCommunication;
  }): Promise<void> {
    const url = `http://localhost:${
      process.env.PORT || 3000
    }/robot/communication/send`;
    const intervalToSend = 5000; // 5 seconds

    const encodedMessage = Buffer.from(JSON.stringify(message)).toString(
      'base64',
    );

    const payload = {
      message: {
        data: encodedMessage,
      },
    };

    setTimeout(() => {
      axios.post(url, payload).catch((error) => {
        console.error(error);
        throw error;
      });
    }, intervalToSend);
  }
}
