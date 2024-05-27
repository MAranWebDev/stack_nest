import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  name: string;
}
