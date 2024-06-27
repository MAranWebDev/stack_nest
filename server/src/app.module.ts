import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV } from './config/env';
import { SeedsService } from './db/seeds/seeds.service';
import { AuthModule } from './features/auth/auth.module';
import { SampleModule } from './features/sample/sample.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ENV] }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: { host: configService.get('REDIS_HOST'), port: configService.get('REDIS_PORT') },
      }),
      inject: [ConfigService],
    }),
    BullBoardModule.forRoot({ route: '/queues', adapter: ExpressAdapter }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    SampleModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedsService],
})
export class AppModule {}
