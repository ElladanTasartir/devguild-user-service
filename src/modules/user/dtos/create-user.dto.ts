import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsUrl()
  avatar_url: string;
}
