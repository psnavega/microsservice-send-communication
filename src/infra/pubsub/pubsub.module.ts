import { Module } from '@nestjs/common';
import { PubSubService } from './pubsub.service';
import { PubSubServiceMock } from '../../../mocks/pubsub.service.mock';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [],
  providers: [
    LoggerService,
    {
      provide: PubSubService,
      useFactory: () => {
        if (process.env.NODE_ENV === 'test') {
          return new PubSubServiceMock();
        }
        return new PubSubService(new LoggerService());
      },
    },
  ],
  exports: [PubSubService],
})
export class PubSubModule {}
