import { IsString, IsUppercase, MaxLength, MinLength } from 'class-validator';

export const IsCustomId = () => {
  return function (object: any, propertyName: string) {
    IsUppercase()(object, propertyName);
    IsString()(object, propertyName);
    MinLength(4)(object, propertyName);
    MaxLength(10)(object, propertyName);
  };
};
