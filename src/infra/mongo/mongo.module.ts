import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Module({
  imports: [],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
