import { ObjectId } from 'mongodb';

export interface ICommunicationResponse {
  id: ObjectId;
  message: string;
}
