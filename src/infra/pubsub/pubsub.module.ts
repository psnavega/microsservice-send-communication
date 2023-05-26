import { Module } from '@nestjs/common';
import { PubSubService } from './pubsub.service';

@Module({
  imports: [],
  providers: [PubSubService],
  exports: [PubSubService],
})
export class PubSubModule {}
