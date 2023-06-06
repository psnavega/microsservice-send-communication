import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { ICommunicationResponse } from '@/communication/domains/interfaces/communicationResponse.interface';
import { CommunicationEmailEntity } from '@/communication/domains/entities/communicationEmail.entity';
import { CommunicationSMSEntity } from '@/communication/domains/entities/communicationSMS.entity';
import { CommunicationType } from '@/shared/enums/communicationType.enum';
import { SendCommunicationUseCase } from '@/communication/datas/use-cases/create-communication.usecase';
import { GetCommunicationUseCase } from '@/communication/datas/use-cases/get-communication.usecase';

@Controller('api')
export class CommunicationController {
  private sendCommunicationUseCase: SendCommunicationUseCase;
  private getCommunnicationUseCase: GetCommunicationUseCase;

  constructor(
    sendCommunicationUseCase: SendCommunicationUseCase,
    getCommunicationUseCase: GetCommunicationUseCase,
  ) {
    this.sendCommunicationUseCase = sendCommunicationUseCase;
    this.getCommunnicationUseCase = getCommunicationUseCase;
  }

  @Post(':type/send')
  async sendCommunication(
    @Param('type') type: CommunicationType,
    @Body()
    communicationData: any,
  ): Promise<ICommunicationResponse> {
    if (!Object.values(CommunicationType).includes(type)) {
      throw new NotFoundException('Communication type invalid');
    }

    const reponse = await this.sendCommunicationUseCase.execute({
      type,
      communicationData,
    });

    return reponse;
  }

  @Get(':id/get')
  async getCommunication(
    @Param('id') id: string,
  ): Promise<CommunicationEmailEntity | CommunicationSMSEntity> {
    const response = await this.getCommunnicationUseCase.execute({ id });

    if (!response) throw new NotFoundException('Communication not found');

    return response;
  }
}
