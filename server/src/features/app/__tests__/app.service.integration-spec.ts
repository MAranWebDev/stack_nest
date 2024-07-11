import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '@/features/app/app.service';

describe(`${AppService.name} (integration)`, () => {
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

  it('getHello - should return a JSON object with message: "Hello World!"', () => {
    const expectedResult = { message: 'Hello World!' };

    const result = service.getHello();

    expect(result).toEqual(expectedResult);
  });
});
