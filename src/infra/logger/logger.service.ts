import * as winston from 'winston';
import { ILogger } from '@/shared/interfaces/logger.interface';
import { configureWinston } from './config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger(configureWinston());
  }

  log(message: string): void {
    this.logger.log('info', message);
  }

  error(message: string, stack?: string): void {
    this.logger.error(message, { stack });
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  verbose(message: string): void {
    this.logger.verbose(message);
  }
}
