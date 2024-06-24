import { IsLowercase, IsString, MaxLength, MinLength, ValidationOptions } from 'class-validator';

export const IsCustomId = (options: { isArray?: boolean } = {}) => {
  return function (object: any, propertyName: string) {
    const validationOptions: ValidationOptions = { each: options.isArray };

    IsLowercase(validationOptions)(object, propertyName);
    IsString(validationOptions)(object, propertyName);
    MinLength(4, validationOptions)(object, propertyName);
    MaxLength(30, validationOptions)(object, propertyName);
  };
};
