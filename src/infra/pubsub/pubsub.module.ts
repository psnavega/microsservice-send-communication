import { Module } from '@nestjs/common';
import { PubSubService } from './pubsub.service';
import { PubSubServiceMock } from '../../../mocks/pubsub.service.mock';

@Module({
  imports: [],
  providers: [
    {
      provide: PubSubService,
      useFactory: () => {
        if (
          process.env.NODE_ENV === 'local' ||
          process.env.NODE_ENV === 'dev'
        ) {
          return new PubSubServiceMock();
        }
        return new PubSubService();
      },
    },
  ],
  exports: [PubSubService],
})
export class PubSubModule {}
