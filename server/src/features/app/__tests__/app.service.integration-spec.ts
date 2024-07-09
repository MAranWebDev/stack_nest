import { AppService } from '@/features/app/app.service';
import { destroyTestApp, setupTestApp } from '@/tests/test-app';

let service: AppService;

beforeAll(async () => {
  const app = await setupTestApp();

  service = app.get(AppService);
});

afterAll(async () => {
  await destroyTestApp();
});

it('getHello - should return a JSON object with message: "Hello World"', () => {
  const expectedResult = { message: 'Hello World!' };

  const result = service.getHello();

  expect(result).toEqual(expectedResult);
});
