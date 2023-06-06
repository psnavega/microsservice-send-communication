import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunicationSMSDto {
  @IsOptional()
  readonly id?: string;

  @IsNotEmpty()
  @IsString()
  readonly to: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;
}
