import { IsAlpha, IsBoolean, IsEmail, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email?: string;

  @IsAlpha()
  full_name?: string;

  @IsPhoneNumber()
  phone_number?: string;

  @IsBoolean()
  active?: boolean;

  @IsBoolean()
  admin?: boolean;
}
