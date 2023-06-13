import { ICreateCommunication } from './createCommunication.interface';

export interface IPubSubService {
  sendMessage({ message }: { message: ICreateCommunication }): Promise<void>;
}
