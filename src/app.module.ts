import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommunicationModule } from './communication/communication.module';
import { PubSubModule } from './infra/pubsub/pubsub.module';
import { AppLoggerMiddleware } from './middlewares/logger';
import { LoggerModule } from './infra/logger/logger.module';
import { RobotModule } from './robot/robot.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PgmaisModule } from './infra/pgmais/pgmais.module';
import { PrismaModule } from './infra/config/prisma/prisma.module';

@Module({
  imports: [
    CommunicationModule,
    PrismaModule,
    PubSubModule,
    LoggerModule,
    RobotModule,
    PgmaisModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppLoggerMiddleware,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
