import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const validateMongooseObjectId = (objectId: string) => {
  const isObjectIdValid = Types.ObjectId.isValid(objectId);
  if (!isObjectIdValid) throw new BadRequestException('Invalid ObjectId format');
};

export const validateNoEmptyObject = (object: object) => {
  const numberOfProperties = Object.keys(object).length;
  if (numberOfProperties === 0)
    throw new BadRequestException('Object must contain at least one property');
};
