import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsInt()
  following?: number;

  @IsOptional()
  @IsInt()
  followers?: number;

  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsUrl()
  avatar_url?: string;
}
