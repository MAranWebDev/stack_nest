import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

import { validateMongooseObjectId, validateNoEmptyObject } from '@/utils/validators';

describe(validateMongooseObjectId.name, () => {
  it.each([
    {
      description: 'should throw BadRequestException when given an invalid ObjectId format',
      input: 'invalidId',
      expectedError: 'Invalid ObjectId format',
    },
    {
      description: 'should not throw when given a valid ObjectId format',
      input: new Types.ObjectId().toHexString(),
      expectedError: null,
    },
  ])('$description', ({ input, expectedError }) => {
    const testFunction = () => validateMongooseObjectId(input);

    if (expectedError !== null) {
      expect(testFunction).toThrow(BadRequestException);
      expect(testFunction).toThrow(expectedError);
    } else {
      expect(testFunction).not.toThrow();
    }
  });
});

describe(validateNoEmptyObject.name, () => {
  it.each([
    {
      description: 'should throw BadRequestException when given an array',
      input: [],
      expectedError: 'Object must not be an array',
    },
    {
      description: 'should throw BadRequestException when given an empty object',
      input: {},
      expectedError: 'Object must contain at least one property',
    },
    {
      description: 'should not throw for an object with properties',
      input: { key: 'value' },
      expectedError: null,
    },
  ])('$description', ({ input, expectedError }) => {
    const testFunction = () => validateNoEmptyObject(input);

    if (expectedError !== null) {
      expect(testFunction).toThrow(BadRequestException);
      expect(testFunction).toThrow(expectedError);
    } else {
      expect(testFunction).not.toThrow();
    }
  });
});
