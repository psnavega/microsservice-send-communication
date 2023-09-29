import { Injectable } from '@nestjs/common';
import { SendgridService } from '@/infra/sendgrid/sendgrid.service';
import { ICommunicationStrategy } from '@/communication/domains/interfaces/communicationStrategy.interface';
import { ZenviaService } from '@/infra/zenvia/zenvia.service';
import { CommunicationType } from '@/shared/enums/communicationType.enum';
import { MailTrapService } from '@/infra/mailtrap/mailtrap.service';

@Injectable()
export class CommunicationStrategy implements ICommunicationStrategy {
  constructor(
    private readonly sendgridService: SendgridService,
    private readonly zenviaService: ZenviaService,
    private readonly mailTrapService: MailTrapService,
  ) {}

  async send(communicationData: any): Promise<any> {
    const strategy = this.strategy({ type: communicationData.type });
    if (!strategy) {
      throw new Error(
        `Communication type '${communicationData.type}' not supported`,
      );
    }
    return strategy.send(communicationData);
  }

  private strategy({ type }: { type: string }): any {
    const getProvider = {
      [CommunicationType.EMAIL]:
        process.env.NODE_ENV === 'local'
          ? this.mailTrapService
          : this.sendgridService,
      [CommunicationType.SMS]: this.zenviaService,
    };

    return getProvider[type];
  }
}
