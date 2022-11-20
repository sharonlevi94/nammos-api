import { IsNotEmpty } from 'class-validator';

export class FindAvailableTimesDto {
  @IsNotEmpty()
  date: string;
}
