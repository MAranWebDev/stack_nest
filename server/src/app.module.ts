import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './config/env';
import { AuthModule } from './features/auth/auth.module';
import { SampleModule } from './features/sample/sample.module';
import { UsersModule } from './features/users/users.module';

const ROUTES = {
  BULL_BOARD: '/queues', // ojo con esto
} as const;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ENV] }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: { host: configService.get('REDIS_HOST'), port: configService.get('REDIS_PORT') },
      }),
      inject: [ConfigService],
    }),
    BullBoardModule.forRoot({ route: ROUTES.BULL_BOARD, adapter: ExpressAdapter }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
