import * as winston from 'winston';
import { ILogger } from '@/shared/interfaces/logger.interface';
import { configureWinston } from './config';
import { Injectable } from '@nestjs/common';

let logger: ILogger;

@Injectable()
export class LoggerService implements ILogger {
  private logger = winston.createLogger(configureWinston());

  static getInstance(): ILogger {
    if (!logger) {
      logger = new LoggerService();
    }
    return logger;
  }

  log(message: string): void {
    this.logger.log('info', message);
  }
  error(message: string, trace: string): void {
    this.logger.error('error', message, trace);
  }
  warn(message: string): void {
    this.logger.warn('warn', message);
  }
  debug(message: string): void {
    this.logger.debug('debug', message);
  }
  verbose(message: string): void {
    this.logger.verbose('verbose', message);
  }
}
