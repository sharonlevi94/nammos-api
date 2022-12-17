import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBoatModelDto } from './dto/create-boat-model.dto';
import { UpdateBoatModelDto } from './dto/update-boat-model.dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BoatModel, BoatModelDocument } from './entities/boat-model.entity';
import { exec } from "child_process";

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
      await this.boatModelModel.create({
        name,
        sub_models,
      });
      return { success: true };
    } catch (e) {
      new HttpException(e?.message, e?.status);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async findAll(): Promise<BoatModel[]> {
    try {
      return this.boatModelModel.find({ deleted_at: null }).exec();
    } catch (e) {
      console.log('findAll boat-models', e);
      new HttpException(e?.message, e?.status);
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async findOne(id: ObjectId): Promise<BoatModel> {
    try {
      const boatModel: BoatModel | null = await this.boatModelModel.findById(
        id,
      );

      if (!boatModel) {
        throw { message: 'דגם אינו קיים', status: HttpStatus.NOT_FOUND };
      }
      return boatModel;
    } catch (e) {
      console.log('findOne boat-models', e);
      new HttpException(e?.message, e?.status);
    }
  }

  async update(id: ObjectId, updateModelDto: UpdateBoatModelDto) {
    try {
      const boatModel: BoatModel | null = await this.boatModelModel.findById(
        id,
      );
      if (!boatModel) {
        throw { message: 'דגם אינו קיים', status: HttpStatus.NOT_FOUND };
      }
      await this.boatModelModel.updateOne(
        { _id: boatModel._id },
        {
          ...updateModelDto,
          updated_at: new Date(),
      });
      return { success: true };
    } catch (e) {
      console.log('update boat-models', e);
      new HttpException(e?.message, e?.status);
    }
  }

  async remove(id: ObjectId) {
    try {
      const boatModel: BoatModel | null = await this.boatModelModel.findById(
        id,
      );
      if (!boatModel) {
        throw { message: 'דגם אינו קיים', status: HttpStatus.NOT_FOUND };
      }
      await this.boatModelModel.updateOne(boatModel?._id, {
        deleted_at: new Date(),
      });
      return { success: true };
    } catch (e) {
      console.log('remove boat-model', e);
      new HttpException(e?.message, e?.status);
    }
  }
}
