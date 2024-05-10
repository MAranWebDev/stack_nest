import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Main');

  /* url */
  app.setGlobalPrefix('api/v1');

  /* swagger */
  const config = new DocumentBuilder()
    .setTitle("Mario's API")
    .setDescription("Mario's API description")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /* validations */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(configService.get('SERVER_PORT'), () => {
    logger.log(`Server running on port ${configService.get('SERVER_PORT')}`);
  });
}
bootstrap();
