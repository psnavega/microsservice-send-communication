import { Injectable } from '@nestjs/common';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';
import axios, { Axios } from 'axios';

@Injectable()
export class PgMaisService implements ICommunicationStrategy {
  private apiPgMais: Axios;

  constructor() {
    this.apiPgMais = axios.create({
      baseURL:
        process.env.MS_COMMUNICATION_PGMAIS_URL ||
        'https://apicanais.pgmais.io/v1/apps',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.MS_COMMUNCATION_PGMAIS_TOKEN}`,
      },
    });
  }

  async send(communicationData: {
    to: string;
    body: string;
  }): Promise<{ provider: string; id: string }> {
    try {
      const response = await this.apiPgMais.post('/sms/messages', {
        carteira: 'VALESAUDE',
        fone: `${communicationData.to}`,
        mensagem: communicationData.body,
      });

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
