import { IsLowercase, IsString, MaxLength, MinLength } from 'class-validator';

export const IsCustomId = () => {
  return function (object: any, propertyName: string) {
    IsLowercase()(object, propertyName);
    IsString()(object, propertyName);
    MinLength(4)(object, propertyName);
    MaxLength(30)(object, propertyName);
  };
};
