import { BadRequestException, NotFoundException } from '@nestjs/common';
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
    jest.restoreAllMocks(); // Clean mocks
    await model.deleteMany({}); // Clean database
  });

  // Tests
  const NAMES = {
    VARD_PERMISSIONS: 'validateAndRemoveDuplicatePermissions',
    CREATE: 'create',
    FIND_ALL: 'findAll',
    FIND_ONE: 'findOne',
    UPDATE: 'update',
    REMOVE: 'remove',
  } as const;

  describe(NAMES.VARD_PERMISSIONS, () => {
    // Helpers
    const invalidPermissions = ['invalidPermission'];
    const uniquePermissions = [PERMISSIONS.READ_USERS];
    const duplicatePermissions = [...uniquePermissions, ...uniquePermissions];

    const validatePermissions = (permissions: string[]) =>
      service[NAMES.VARD_PERMISSIONS](permissions);

    // Test errors
    it('should throw BadRequestException when an invalid permission is provided', () => {
      const testFunction = () => validatePermissions(invalidPermissions);

      expect(testFunction).toThrow(BadRequestException);
    });

    // Test provided values
    it.each([
      {
        description: 'should return an empty array when given an empty array',
        input: [],
        expected: [],
      },
      {
        description:
          'should return an array with unique permissions when given duplicated permissions',
        input: duplicatePermissions,
        expected: uniquePermissions,
      },
      {
        description:
          'should return the same array with unique permissions when all permissions are valid and unique',
        input: uniquePermissions,
        expected: uniquePermissions,
      },
    ])('$description', ({ input, expected }) => {
      const result = validatePermissions(input);

      expect(result).toEqual(expected);
    });
  });

  describe(NAMES.CREATE, () => {
    // Helpers
    const newProfile: CreateProfileDto = { _id: 'test1' };
    const newProfileEmptyPermissions: CreateProfileDto = {
      _id: 'test2',
      permissions: [],
    };
    const newProfilePermissions: CreateProfileDto = {
      _id: 'test3',
      permissions: [PERMISSIONS.READ_USERS],
    };
    const newProfiles = [newProfile, newProfileEmptyPermissions, newProfilePermissions];

    // Test errors
    it('should throw BadRequestException if profile already exists', async () => {
      // Load fake data
      await model.create(newProfile);

      const resultPromise = service.create(newProfile);

      await expect(resultPromise).rejects.toThrow(BadRequestException);
    });

    // Test validations
    it.each([
      {
        description: 'should be called when permissions property is provided',
        input: newProfilePermissions,
      },
      {
        description: 'should not validate permissions when permissions property is not provided',
        input: newProfile,
      },
    ])(`${NAMES.VARD_PERMISSIONS} $description`, async ({ input }) => {
      const spyValidatePermissions = jest.spyOn(service as any, NAMES.VARD_PERMISSIONS);

      await service.create(input);

      if (input.permissions) {
        expect(spyValidatePermissions).toHaveBeenCalled();
      } else {
        expect(spyValidatePermissions).not.toHaveBeenCalled();
      }
    });

    // Test provided values
    it('should create and return 3 profiles with the provided values and include all their properties', async () => {
      const expected = newProfiles.map((profile) => ({
        ...profile,
        permissions: profile.permissions || [],
        __v: 0,
      }));

      const createProfilePromises = newProfiles.map((profile) => service.create(profile));
      const result = await Promise.all(createProfilePromises);
      const plainResult = result.map((doc) => doc.toObject());

      expect(plainResult).toEqual(expect.arrayContaining(expected));
    });
  });

  describe(NAMES.FIND_ALL, () => {
    it('should return an empty array if no profiles exist', async () => {
      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('should return an array with a single existing profile', async () => {
      // Load fake data
      const profileToLoad: CreateProfileDto = { _id: 'test1' };
      await model.create(profileToLoad);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe(NAMES.FIND_ONE, () => {
    const profileToLoad: CreateProfileDto = { _id: 'test1' };

    it('should throw NotFoundException if the provided profile ID is not found', async () => {
      const resultPromise = service.findOne(profileToLoad._id);

      await expect(resultPromise).rejects.toThrow(NotFoundException);
    });

    it('should return the profile that matches the provided ID', async () => {
      // Load fake data
      await model.create(profileToLoad);

      const result = await service.findOne(profileToLoad._id);

      expect(result._id).toBe(profileToLoad._id);
    });
  });

  // describe(NAMES.REMOVE, () => {
  //   it(`${NAMES.FIND_ONE} should be called`, async () => {
  //     const spyFindOne = jest.spyOn(service, NAMES.FIND_ONE);

  //     try {
  //       await service.remove('test1');
  //     } catch (error) {}

  //     expect(spyFindOne).toHaveBeenCalled();
  //   });

  //   it('should delete the profile that matches the provided ID and return a message', async () => {});
  // });
});
