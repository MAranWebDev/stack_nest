import { BadRequestException, INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProfileDto } from '@/features/users/dtos';
import { UserProfiles } from '@/features/users/schemas';
import { UserProfilesService } from '@/features/users/services';
import { destroyTestApp, setupTestApp } from '@/tests/test-app';

describe('UserProfiles (e2e)', () => {
  let app: INestApplication;
  let model: Model<UserProfiles>;
  let service: UserProfilesService;

  beforeAll(async () => {
    app = await setupTestApp();

    const modelToken = getModelToken(UserProfiles.name);
    model = app.get(modelToken);
    service = app.get(UserProfilesService);
  });

  afterAll(async () => {
    await destroyTestApp();
  });

  afterEach(async () => {
    //Clean schema data after each test
    await model.deleteMany();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(model).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('/user-profiles (POST)', () => {
    const createProfileDto: CreateProfileDto = { _id: 'test1' };

    it('should throw BadRequestException if profile already exists', async () => {
      // Create first record
      await service.create(createProfileDto);

      // Try to create duplicate record
      await expect(service.create(createProfileDto)).rejects.toThrow(BadRequestException);
    });
  });
});
