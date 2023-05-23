import { Module } from '@nestjs/common';
import { CommunicationModule } from './communication/communication.module';
import { MongoModule } from './infra/config/mongo/mongo.module';

@Module({
  imports: [CommunicationModule, MongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
