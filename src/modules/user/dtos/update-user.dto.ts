import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  following?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  followers?: number;

  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsUrl()
  avatar_url?: string;
}
