import { ICommunicationSMS } from '../interfaces/communicationSMS.interface';
import { ICommunicationEmail } from '../interfaces/communicationEmail.interface';
import { CommunicationType } from '@/shared/enums/communicationType.enum';

interface UpdateCommunicationFields {
  id: string;
  fieldsToUpdate: Record<string, any>;
}

export interface CommunicationRepositoryInterface {
  create({
    obj,
    type,
  }: {
    obj: ICommunicationEmail | ICommunicationSMS;
    type: CommunicationType;
  }): Promise<{ id: string }>;

  get({ id }: { id: string }): Promise<any>;

  update({ id, fieldsToUpdate }: UpdateCommunicationFields): Promise<any>;
}
