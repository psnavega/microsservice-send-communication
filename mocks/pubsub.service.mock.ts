import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { IPubSubService } from '@/shared/interfaces/pubSub.interface';

@Injectable()
export class PubSubServiceMock implements IPubSubService {
  async sendMessage({ message }: { message: any }): Promise<void> {
    const url = `http://localhost:${process.env.PORT}/robot/communication/send`;

    try {
      await axios.post(url, message);
    } catch (err) {
      throw new Error('Error on sending local message');
    }
  }
}
