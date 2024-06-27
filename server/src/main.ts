import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Envs only for this file
  const configService = app.get(ConfigService);
  const PORT = configService.get('SERVER_PORT') || 3000;

  const logger = new Logger('Main');

  // Api url
  app.setGlobalPrefix('api/v1');

  // Swagger & swagger url
  const config = new DocumentBuilder()
    .setTitle("Mario's API")
    .setDescription("Mario's API description")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Cors
  app.enableCors({ origin: configService.get('CLIENT_ORIGIN') });

  // Validations
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start server
  await app.listen(PORT, () => {
    logger.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
