import { Injectable } from '@nestjs/common';
import { SendgridService } from '@/infra/sendgrid/sendgrid.service';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';
import { ZenviaService } from '@/infra/zenvia/zenvia.service';

@Injectable()
export class CommunicationStrategy implements ICommunicationStrategy {
  private strategies = new Map<string, any>();

  constructor(
    private readonly sendgridService: SendgridService,
    private readonly zenviaService: ZenviaService,
  ) {
    this.registerStrategy('email', this.sendgridService);
    this.registerStrategy('sms', this.zenviaService);
  }

  async send(communicationData: any): Promise<any> {
    const strategy = this.strategies.get(communicationData.type);
    if (!strategy) {
      throw new Error(
        `Communication type '${communicationData.type}' not supported`,
      );
    }
    return strategy.send(communicationData);
  }

  private registerStrategy(type: string, service: any): void {
    this.strategies.set(type, service);
  }
}
