export interface ICommunicationStrategy {
  send(communicationData: any): Promise<any>;
}
