import { CommunicationType } from '@/shared/enums/communicationType.enum';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';

interface UpdateCommunicationFields {
  id: string;
  fieldsToUpdate: Record<string, any>;
}

export interface CommunicationRepositoryInterface {
  create({
    obj,
    type,
  }: {
    obj: ICreateCommunication;
    type: CommunicationType;
  }): Promise<{ id: string }>;

  get({ id }: { id: string }): Promise<any>;

  update({ id, fieldsToUpdate }: UpdateCommunicationFields): Promise<any>;
}
