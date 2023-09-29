import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { ICommunicationResponse } from '@/communication/domains/interfaces/communicationResponse.interface';
import { CommunicationType } from '@/shared/enums/communicationType.enum';
import { CreateCommunicationUseCase } from '@/communication/datas/use-cases/create-communication.usecase';
import { GetCommunicationUseCase } from '@/communication/datas/use-cases/get-communication.usecase';
import { getValidatorSchema } from '@/communication/domains/validators/communication.validator';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

@Controller('api')
export class CommunicationController {
  constructor(
    private readonly createCommunicationUseCase: CreateCommunicationUseCase,
    private readonly getCommunicationUseCase: GetCommunicationUseCase,
  ) {}

  @Post(':type/send')
  async sendCommunication(
    @Param('type') type: CommunicationType,
    @Body()
    communicationData: any,
  ): Promise<ICommunicationResponse> {
    const schema = getValidatorSchema(type);

    await schema.validateAsync(communicationData);

    const reponse = await this.createCommunicationUseCase.execute({
      type,
      communicationData,
    });

    return reponse;
  }

  @Get(':id/get')
  async getCommunication(
    @Param('id') id: string,
  ): Promise<ICreateCommunication> {
    const response = await this.getCommunicationUseCase.execute({ id });

    if (!response) throw new NotFoundException('Communication not found');

    return response;
  }
}
