import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateAuthDto {
  @IsNumberString()
  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  password: string;
}
