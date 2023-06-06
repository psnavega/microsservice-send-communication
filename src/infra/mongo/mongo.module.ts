import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
