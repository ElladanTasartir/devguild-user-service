import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  github_id?: number;

  @IsOptional()
  @IsUrl()
  avatar_url?: string;
}
