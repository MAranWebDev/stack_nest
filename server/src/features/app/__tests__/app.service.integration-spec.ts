import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '@/features/app/app.service';

describe(`${AppService.name} (integration)`, () => {
  // Tests setup
  let module: TestingModule;
  let service: AppService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get(AppService);
  });

  afterAll(async () => {
    if (module) await module.close();
  });

  // Tests
  const NAMES = {
    GET_HELLO: 'getHello',
  };

  describe(NAMES.GET_HELLO, () => {
    it('should return a JSON object with message: "Hello World!"', () => {
      const expected = { message: 'Hello World!' };

      const result = service.getHello();

      expect(result).toEqual(expected);
    });
  });
});
