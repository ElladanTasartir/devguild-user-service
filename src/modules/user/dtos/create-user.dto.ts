import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsInt()
  @IsPositive()
  github_id: number;

  @IsUrl()
  avatar_url: string;
}
