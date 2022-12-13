import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoatModelsService } from './boat-models.service';
import { CreateBoatModelDto } from './dto/create-boat-model.dto';
import { UpdateBoatModelDto } from './dto/update-boat-model.dto';
import { ObjectId } from 'mongoose';

@Controller('models')
export class BoatModelsController {
  constructor(private readonly boatModelsService: BoatModelsService) {}

  @Post()
  create(@Body() createModelDto: CreateBoatModelDto) {
    return this.boatModelsService.create(createModelDto);
  }

  @Get()
  findAll() {
    return this.boatModelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.boatModelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateModelDto: UpdateBoatModelDto) {
    return this.boatModelsService.update(id, updateModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.boatModelsService.remove(id);
  }
}
