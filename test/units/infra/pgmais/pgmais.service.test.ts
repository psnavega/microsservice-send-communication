import { PgMaisService } from '@/infra/pgmais/pgmais.service';
import * as nock from 'nock';

describe('PgMaisService', () => {
  let pgMaisService: PgMaisService;

  beforeAll(() => {
    pgMaisService = new PgMaisService();
  });

  describe('send', () => {
    it('should call send with successfully', async () => {
      nock(`${process.env.MS_COMMUNICATION_PGMAIS_URL}`).post('/sms/messages').reply(200, {
        id: '123456789',
      });

      const response = await pgMaisService.send({
        to: '11999999999',
        body: 'Teste',
      });

      expect(response).toEqual({ provider: 'pgmais', id: '123456789' });
    });

    it('should thrown exception if response is 500', async () => {
      nock(`${process.env.MS_COMMUNICATION_PGMAIS_URL}`)
        .post('/sms/messages')
        .reply(500, 'Internal Server Error');

      try {
        await pgMaisService.send({
          to: '11999999999',
          body: 'Teste',
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
