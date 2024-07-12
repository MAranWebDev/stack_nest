import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

import { validateMongooseObjectId, validateNoEmptyObject } from '@/utils/validators';

describe(validateMongooseObjectId.name, () => {
  it('should throw BadRequestException when given an invalid ObjectId format', () => {
    const input = 'invalidId';
    const expectedError = 'Invalid ObjectId format';
    const testFunction = () => validateMongooseObjectId(input);

    expect(testFunction).toThrow(BadRequestException);
    expect(testFunction).toThrow(expectedError);
  });

  it('should not throw when given a valid ObjectId format', () => {
    const input = new Types.ObjectId().toHexString();
    const testFunction = () => validateMongooseObjectId(input);

    expect(testFunction).not.toThrow();
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
  ])('$description', ({ input, expectedError }) => {
    const testFunction = () => validateNoEmptyObject(input);

    expect(testFunction).toThrow(BadRequestException);
    expect(testFunction).toThrow(expectedError);
  });

  it('should not throw for an object with properties', () => {
    const input = { key: 'value' };
    const testFunction = () => validateNoEmptyObject(input);

    expect(testFunction).not.toThrow();
  });
});
