import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '@/infra/logger/logger.service';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl: path } = request;
    const userAgent = request.get('user-agent') || '';
    const requestBody = JSON.stringify(request.body);
    const contentLength = response.get('content-length') || 0;

    response.on('close', () => {
      const logMessage = `${method} ${path} ${response.statusCode} ${contentLength} - ${userAgent} ${ip}`;
      if (requestBody !== '{}') {
        this.logger.log(`${logMessage} - ${requestBody}`);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}
