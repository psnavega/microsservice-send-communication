export class PubSubService {
  private projectId: string;
  private topicName: string;
  private subscriptionName: string;

  constructor() {
    this.projectId = process.env.GOOGLE_PROJECT_ID || 'teste-gcp-pubsub';
    this.topicName = process.env.PUBSUB_TOPIC_NAME || 'teste-gcp-pubsub';
    this.subscriptionName =
      process.env.PUBSUB_SUBSCRIPTION_NAME || 'teste-gcp-pubsub';
  }

  getProjectId(): string {
    return this.projectId;
  }

  getTopicName(): string {
    return this.topicName;
  }

  getSubscriptionName(): string {
    return this.subscriptionName;
  }
}
