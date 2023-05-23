import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CommunicationSMSUseCase } from '@/communication/datas/use-cases/create-communicationSMS.usecase';
import { CommunicationEmailUseCase } from '@/communication/datas/use-cases/create-communicationEmail.usecase';
import { ICommunicationResponse } from '@/communication/domains/interfaces/communicationResponse';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';

@Controller('api')
export class CommunicationController {
  constructor(
    private readonly communicationEmailUseCase: CommunicationEmailUseCase,
    private readonly communicationSMSUseCase: CommunicationSMSUseCase,
  ) {}

  @Post(':type/send')
  async sendCommunication(
    @Param('type') type: 'sms' | 'email',
    @Body()
    communicationData: CommunicationEmailEntity | CommunicationSMSEntity,
  ): Promise<ICommunicationResponse> {
    try {
      const { to, body } = communicationData;

      if (type === 'email') {
        const emailData = communicationData as CommunicationEmailEntity;
        const { subject, from } = emailData;

        return this.communicationEmailUseCase.execute({
          from,
          to,
          subject,
          body,
        });
      } else if (type === 'sms') {
        return this.communicationSMSUseCase.execute({ to, body });
      }

      throw new NotFoundException('Type not found');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
