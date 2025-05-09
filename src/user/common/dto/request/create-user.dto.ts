import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;
}
