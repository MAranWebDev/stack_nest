import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

import { validateMongooseObjectId, validateNoEmptyObject } from '@/utils/validators';

describe(validateMongooseObjectId.name, () => {
  const invalidId = 'invalidId';
  const validMongooseObjectId = new Types.ObjectId().toHexString();

  it('throws BadRequestException for invalid ObjectId format', () => {
    expect(() => validateMongooseObjectId(invalidId)).toThrow(BadRequestException);
  });

  it('does not throw for valid ObjectId format', () => {
    expect(() => validateMongooseObjectId(validMongooseObjectId)).not.toThrow();
  });
});

describe(validateNoEmptyObject.name, () => {
  const emptyObject = {};
  const objectWithValue = { key: 'value' };

  it('throws BadRequestException for an empty object', () => {
    expect(() => validateNoEmptyObject(emptyObject)).toThrow(BadRequestException);
  });

  it('does not throw for an object with properties', () => {
    expect(() => validateNoEmptyObject(objectWithValue)).not.toThrow();
  });
});
