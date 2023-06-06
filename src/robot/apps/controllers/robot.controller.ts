import { Controller, Post, Body } from '@nestjs/common';
import { UpdateCommunicationUseCase } from '@/robot/datas/use-cases/update-communication.use-case';

@Controller('robot')
export class RobotController {
  private updateCommunicationUseCase: UpdateCommunicationUseCase;

  constructor(updateCommunicationUseCase: UpdateCommunicationUseCase) {
    this.updateCommunicationUseCase = updateCommunicationUseCase;
  }

  @Post('communication/send')
  async sendCommunication(
    @Body()
    communicationData: any,
  ): Promise<any> {
    const response = await this.updateCommunicationUseCase.execute(
      communicationData,
    );

    return response;
  }
}
