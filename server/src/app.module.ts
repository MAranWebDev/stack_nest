import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV } from './config/env';
import { AppController } from './features/app/app.controller';
import { AppService } from './features/app/app.service';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './features/database/database.module';
import { QueuesModule } from './features/queues/queues.module';
import { SampleModule } from './features/sample/sample.module';
import { UsersModule } from './features/users/users.module';
import { SeedsService } from './seeds/seeds.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ENV] }),
    QueuesModule,
    DatabaseModule,
    SampleModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedsService],
})
export class AppModule {}
