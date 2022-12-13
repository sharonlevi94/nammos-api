import { PartialType } from '@nestjs/mapped-types';
import { CreateBoatModelDto } from './create-boat-model.dto';

export class UpdateBoatModelDto extends PartialType(CreateBoatModelDto) {}
