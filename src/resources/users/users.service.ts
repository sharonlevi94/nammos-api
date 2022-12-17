import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateManyUserDto } from './dto/update-many-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model, ObjectId } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(body: CreateUserDto): Promise<User> {
    try {
      const { full_name, phone_number, email, password } = body;
      const existUser: User | null = await this.userModel.findOne({
        email: email,
      });
      if (existUser) {
        throw new HttpException('user-already-exist', HttpStatus.NOT_FOUND);
      }
      const userPassword: string = await bcrypt.hash(password, 10);
      const newUser: User = new User();
      newUser.full_name = full_name;
      newUser.email = email;
      newUser.password = userPassword;
      newUser.phone_number = phone_number;
      newUser.active = false;
      newUser.admin = false;
      newUser.created_at = new Date();
      return this.userModel.create(newUser);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: any): Promise<User[]> {
    try {
      const { filter } = query;
      if (filter) {
        return this.userModel.find({ full_name: { $regex: filter } }).exec();
      }
      return this.userModel
        .find({}, { full_name: true, active: true, admin: true })
        .exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: ObjectId): Promise<User> {
    try {
      const user: User | null = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException('can-not-find-user', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    try {
      return this.userModel.findByIdAndUpdate(id, {
        ...updateUserDto,
        updated_at: new Date(),
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateMany(body: UpdateManyUserDto) {
    const { users } = body;
    try {
      for (const user of users) {
        await this.userModel.updateOne(
          {
            _id: user?._id,
          },
          {
            ...user,
            updated_at: new Date(),
          },
        );
      }
      return { success: true };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
