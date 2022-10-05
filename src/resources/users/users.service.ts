import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
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
      newUser.created_at = new Date();
      return this.userModel.create(newUser);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
