import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '@/app.module';
import { AppController } from '@/features/app/app.controller';

describe(`${AppController.name} (e2e)`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/ (GET)', () => {
    it('should return a JSON object with a message property', async () => {
      const response = await request(app.getHttpServer()).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });
  });
});
