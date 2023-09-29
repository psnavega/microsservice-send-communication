import { Controller, Post, Body } from '@nestjs/common';
import { UpdateCommunicationUseCase } from '@/robot/datas/use-cases/update-communication.use-case';

@Controller('robot')
export class RobotController {
  constructor(
    private readonly updateCommunicationUseCase: UpdateCommunicationUseCase,
  ) {}

  @Post('communication/send')
  async sendCommunication(
    @Body()
    payload: any,
  ): Promise<{ message: string }> {
    const communicationData = JSON.parse(
      Buffer.from(payload.message.data, 'base64').toString(),
    );

    const response = await this.updateCommunicationUseCase.execute(
      communicationData,
    );

    return response;
  }
}
