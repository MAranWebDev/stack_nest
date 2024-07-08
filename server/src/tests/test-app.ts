import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { ENV } from '@/config/env';
import { AppController } from '@/features/app/app.controller';
import { AppService } from '@/features/app/app.service';
import { AuthModule } from '@/features/auth/auth.module';
import { UsersModule } from '@/features/users/users.module';

let mongoServer: MongoMemoryServer;
let app: INestApplication;

export const setupTestApp = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  const moduleFixture = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(mongoUri), // Fake database
      ConfigModule.forRoot({ isGlobal: true, load: [ENV] }),
      AuthModule,
      UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.init();

  return app;
};

export const teardownTestApp = async () => {
  if (app) await app.close();
  if (mongoServer) await mongoServer.stop();
};
