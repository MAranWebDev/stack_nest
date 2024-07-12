import { Server } from 'http';

import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

import { AppController } from '@/features/app/app.controller';
import { AppService } from '@/features/app/app.service';
import { destroyTestApp, setupTestApp } from '@/tests/test-app';

describe(`${AppController.name} (integration)`, () => {
  // Tests setup
  let service: AppService;
  let httpServer: Server;

  beforeAll(async () => {
    const app = await setupTestApp();

    service = app.get(AppService);
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await destroyTestApp();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  // Tests
  const ROUTE = '/';

  describe(`GET ${ROUTE}`, () => {
    it('should call the service, return status 200 and a defined body', async () => {
      const spyGetHello = jest.spyOn(service, 'getHello');

      const { status, body } = await request(httpServer).get(ROUTE);

      expect(spyGetHello).toHaveBeenCalled();
      expect(status).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });
  });
});
