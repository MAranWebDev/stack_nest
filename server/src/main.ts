import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');

  await app.listen(configService.get('SERVER_PORT'), () => {
    console.log(`server running on port ${configService.get('SERVER_PORT')}`);
  });
}
bootstrap();
