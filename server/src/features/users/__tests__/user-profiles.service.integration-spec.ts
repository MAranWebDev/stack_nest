import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PERMISSIONS } from '@/features/users/constants';
import { CreateProfileDto } from '@/features/users/dtos';
import { UserProfiles } from '@/features/users/schemas';
import { UserProfilesService } from '@/features/users/services';
import { destroyTestApp, setupTestApp } from '@/tests/test-app';

describe(`${UserProfilesService.name} (integration)`, () => {
  // Tests setup
  let model: Model<UserProfiles>;
  let service: UserProfilesService;

  beforeAll(async () => {
    const app = await setupTestApp();

    const modelToken = getModelToken(UserProfiles.name);
    model = app.get(modelToken);
    service = app.get(UserProfilesService);
  });

  afterAll(async () => {
    await destroyTestApp();
  });

  beforeEach(async () => {
    await model.deleteMany();
  });

  // Tests
  const NAMES = {
    VARD_PERMISSIONS: 'validateAndRemoveDuplicatePermissions',
    CREATE: 'create',
    FIND_ALL: 'findAll',
    FIND_ONE: 'findOne',
    UPDATE: 'update',
    REMOVE: 'remove',
  };

  describe(NAMES.VARD_PERMISSIONS, () => {
    // Test variables
    const validatePermissions = (permissions: string[]) =>
      service[NAMES.VARD_PERMISSIONS](permissions);

    it('should throw BadRequestException when an invalid permission is provided', () => {
      const input = ['invalidPermission'];
      const testFunction = () => validatePermissions(input);

      expect(testFunction).toThrow(BadRequestException);
    });

    it.each([
      {
        description: 'should return an empty array when given an empty array',
        input: [],
        expected: [],
      },
      {
        description:
          'should return an array with unique permissions when given duplicated permissions',
        input: [PERMISSIONS.READ_USERS, PERMISSIONS.READ_USERS],
        expected: [PERMISSIONS.READ_USERS],
      },
      {
        description:
          'should return the same array with unique permissions when all permissions are valid and unique',
        input: [PERMISSIONS.READ_USERS],
        expected: [PERMISSIONS.READ_USERS],
      },
    ])('$description', ({ input, expected }) => {
      const result = validatePermissions(input);

      expect(result).toEqual(expected);
    });
  });

  // describe(NAMES.CREATE, () => {});

  describe(NAMES.FIND_ALL, () => {
    it('should return an empty array if no profiles exist', async () => {
      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('should return an array with profiles if they exist', async () => {
      const profilesToLoad: CreateProfileDto[] = [
        { _id: 'test1' },
        { _id: 'test2', permissions: [] },
        { _id: 'test3', permissions: [PERMISSIONS.READ_USERS] },
      ];
      await model.insertMany(profilesToLoad);

      const result = await service.findAll();
      const plainResult = result.map((doc) => doc.toObject());
      const expected = profilesToLoad.map((profile) => ({
        ...profile,
        permissions: profile.permissions || [],
        __v: 0,
      }));

      expect(plainResult).toEqual(expect.arrayContaining(expected));
    });
  });

  // describe(NAMES.FIND_ONE, () => {});
  // describe(NAMES.UPDATE, () => {});
  // describe(NAMES.REMOVE, () => {});
});
