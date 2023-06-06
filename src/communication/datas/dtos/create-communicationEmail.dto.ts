import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunicationEmailDto {
  @IsOptional()
  id?: string;

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
