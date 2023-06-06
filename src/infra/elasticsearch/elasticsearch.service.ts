import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ElasticsearchService {
  private client: Client;
  private loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;
    this.client = new Client({
      node: process.env.ELASTICSEARCH_NODE || 'http://elasticsearch:9200',
    });
  }

  async indexLog(message: string): Promise<void> {
    try {
      const logEntry = {
        message,
        timestamp: new Date(),
      };

      if (process.env.NODE_ENV !== 'test') {
        const indexName = this.generateIndexName();
        await this.client.index({
          index: indexName,
          body: logEntry,
        });
      }
    } catch (err) {
      this.loggerService.error('Error while indexing log: ', err);
      throw err;
    }
  }

  private generateIndexName(): string {
    const currentDate = moment().format('YYYY.MM.DD');
    const applicationName = 'ms_communication';
    const environment = process.env.NODE_ENV || 'test';

    return `${environment}-vss-${applicationName}-logs-${currentDate}`;
  }
}
