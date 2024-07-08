import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { PERMISSIONS } from '@/features/users/constants';
import { UserProfiles } from '@/features/users/schemas';
import { UserProfilesService } from '@/features/users/services';

describe(UserProfilesService.name, () => {
  let module: TestingModule;
  let service: UserProfilesService;

  beforeAll(async () => {
    const modelToken = getModelToken(UserProfiles.name);

    module = await Test.createTestingModule({
      providers: [
        UserProfilesService,
        {
          provide: modelToken,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    service = module.get(UserProfilesService);
  });

  afterAll(async () => {
    if (module) await module.close();
  });

  describe('validateAndRemoveDuplicatePermissions', () => {
    const { READ_USERS } = PERMISSIONS;

    const validatePermissions = (permissions: string[]) =>
      service['validateAndRemoveDuplicatePermissions'](permissions);

    it.each([
      {
        description: 'should return an empty array when given an empty array',
        input: [],
        expected: [],
      },
      {
        description: 'should throw BadRequestException when an invalid permission is provided',
        input: ['invalidPermission'],
        expected: BadRequestException,
      },

      {
        description:
          'should return an array with unique permissions when given duplicated permissions',
        input: [READ_USERS, READ_USERS],
        expected: [READ_USERS],
      },
      {
        description:
          'should return the same array with unique permissions when all permissions are valid and unique',
        input: [READ_USERS],
        expected: [READ_USERS],
      },
    ])('$description', ({ input, expected }) => {
      if (expected === BadRequestException) {
        const testFunction = () => validatePermissions(input);
        expect(testFunction).toThrow(expected);
      } else {
        const result = validatePermissions(input);
        expect(result).toEqual(expected);
      }
    });
  });
});
