import { Module } from '@nestjs/common';
import { ZenviaService } from './zenvia.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [ZenviaService],
  exports: [ZenviaService],
})
export class ZenviaModule {}
