import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommunicationSMSDto {
  @IsNotEmpty()
  @IsString()
  readonly to: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;
}
