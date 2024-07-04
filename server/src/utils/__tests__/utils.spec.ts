import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

import { validateMongooseObjectId, validateNoEmptyObject } from '@/utils/validators';

describe('validateMongooseObjectId', () => {
  const invalidId = 'invalidId';
  const validMongooseObjectId = new Types.ObjectId().toHexString();

  it('throws BadRequestException for invalid ObjectId format', () => {
    expect(() => validateMongooseObjectId(invalidId)).toThrow(BadRequestException);
  });

  it('returns true for valid ObjectId format', () => {
    expect(validateMongooseObjectId(validMongooseObjectId)).toBe(true);
  });
});

describe('validateNoEmptyObject', () => {
  const emptyObject = {};
  const objectWithValue = { key: 'value' };

  it('throws BadRequestException for an empty object', () => {
    expect(() => validateNoEmptyObject(emptyObject)).toThrow(BadRequestException);
  });

  it('returns true for an object with properties', () => {
    expect(validateNoEmptyObject(objectWithValue)).toBe(true);
  });
});
