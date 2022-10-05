import { IsAlpha, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsAlpha()
  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;
}
