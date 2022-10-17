import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { User, UserDocument } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async login(createAuthDto: CreateAuthDto) {
    try {
      const { email, password } = createAuthDto;
      const user: User | null = await this.userModel
        .findOne({ email: email })
        .exec();
      if (!user) {
        throw new HttpException('המשתמש אינו קיים', HttpStatus.NOT_FOUND);
      }
      const passwordMatch: boolean = await bcrypt.compare(
        password,
        user.password,
      );
      if (!passwordMatch) {
        throw new HttpException('סיסמה אינה נכונה', HttpStatus.BAD_REQUEST);
      }
      const token: string = this.jwtService.sign({
        jti: user._id,
      });

      const updateUserRes = await this.userModel.findByIdAndUpdate(user._id, {
        last_logged: new Date(),
      });
      if (!updateUserRes) {
        throw new HttpException(
          'אירעה שגיאה בתהחברות',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return { token };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
