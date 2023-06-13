import { Module } from '@nestjs/common';
import { PubSubService } from './pubsub.service';
import { PubSubServiceMock } from '../../../mocks/pubsub.service.mock';

@Module({
  imports: [],
  providers: [
    {
      provide: PubSubService,
      useFactory: () => {
        if (process.env.NODE_ENV === 'test') {
          return new PubSubServiceMock();
        }
        return new PubSubService();
      },
    },
  ],
  exports: [PubSubService],
})
export class PubSubModule {}
