import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommunicationEmailDto {
  @IsNotEmpty()
  @IsString()
  readonly to: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @IsNotEmpty()
  @IsString()
  readonly from: string;

  @IsNotEmpty()
  @IsString()
  readonly subject: string;
}
