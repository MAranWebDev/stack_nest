import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateSampleDto {
  @IsString()
  @Length(4, 50)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(99)
  quantity: number;
}
