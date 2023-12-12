import { Injectable } from '@nestjs/common';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';
import axios from 'axios';

@Injectable()
export class PgMaisService implements ICommunicationStrategy {
  async send(communicationData: {
    to: string;
    text: string;
  }): Promise<{ provider: string; id: string }> {
    try {
      const response = await axios.post(
        'https://apicanais.pgmais.io/v1/apps/sms/messages',
        {
          carteira: 'VALESAUDE',
          fone: `55${communicationData.to}`,
          mensagem: communicationData.text,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${process.env.PGMAIS_TOKEN}`,
          },
        },
      );

      return {
        provider: 'pgmais',
        id: response.data.id,
      };
    } catch (error) {
      console.error('Error on send sms with pgmais:', error.message);
      throw new Error(error);
    }
  }
}
