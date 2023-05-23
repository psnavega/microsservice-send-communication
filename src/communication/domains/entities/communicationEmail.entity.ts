import { ICommunicationEmail } from '../interfaces/communicationEmail.interface';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CommunicationEmailEntity implements ICommunicationEmail {
  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  subject: string;
}
