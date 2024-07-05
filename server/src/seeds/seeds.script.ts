import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

import { SeedsService } from './seeds.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Run seeds in order
  const seedsService = app.get(SeedsService);
  await seedsService.seedsUserProfiles();
  await seedsService.seedsUsers();

  await app.close();
}
bootstrap();
