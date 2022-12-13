import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBoatModelDto } from './dto/create-boat-model.dto';
import { UpdateBoatModelDto } from './dto/update-boat-model.dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BoatModel, BoatModelDocument } from './entities/boat-model.entity';

@Injectable()
export class BoatModelsService {
  constructor(
    @InjectModel(BoatModel.name)
    private boatModelModel: Model<BoatModelDocument>,
  ) {}

  async create(createModelDto: CreateBoatModelDto) {
    try {
      const { name, sub_models } = createModelDto;
      const existModel: BoatModel | null = await this.boatModelModel
        .findOne()
        .where('name')
        .equals(name);
      if (existModel) {
        throw {
          message: 'לא ניתן להוסיף דגם קיים',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      return this.boatModelModel.create({
        name,
        sub_models,
      });
    } catch (e) {
      new HttpException(e?.message, e?.status);
    }
  }

  findAll() {
    return `This action returns all models`;
  }

  findOne(id: ObjectId) {
    return `This action returns a #${id} model`;
  }

  update(id: ObjectId, updateModelDto: UpdateBoatModelDto) {
    return `This action updates a #${id} model`;
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} model`;
  }
}
