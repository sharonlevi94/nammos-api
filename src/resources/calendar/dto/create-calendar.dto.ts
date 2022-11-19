import { IsNotEmpty } from 'class-validator';

export class CreateCalendarDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;
}
