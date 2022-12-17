import { IsNotEmpty } from 'class-validator';

export class CreateQueueDto {
  @IsNotEmpty()
  user_id: string;
}
