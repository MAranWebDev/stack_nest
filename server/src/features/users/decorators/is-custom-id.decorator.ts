import {
  IsArray,
  IsLowercase,
  IsString,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';

interface OptionsType {
  isArray?: boolean;
}

export const IsCustomId = ({ isArray }: OptionsType = {}) => {
  return function (object: any, propertyName: string) {
    const validationOptions: ValidationOptions = { each: isArray };

    isArray && IsArray()(object, propertyName);
    IsLowercase(validationOptions)(object, propertyName);
    IsString(validationOptions)(object, propertyName);
    MinLength(4, validationOptions)(object, propertyName);
    MaxLength(30, validationOptions)(object, propertyName);
  };
};
