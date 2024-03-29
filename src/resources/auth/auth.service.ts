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
  async login(createAuthDto: CreateAuthDto): Promise<any> {
    try {
      const { phone_number, password } = createAuthDto;
      console.log('find user in db');
      const user: User | null = await this.userModel
        .findOne({ phone_number: phone_number })
        .exec();
      if (!user) {
        throw new HttpException('המשתמש אינו קיים', HttpStatus.NOT_FOUND);
      }
      if (!user.active) {
        throw new HttpException('המשתמש אינו פעיל', HttpStatus.BAD_REQUEST);
      }
      console.log('compare passwords');
      const passwordMatch: boolean = await bcrypt.compare(
        password,
        user.password,
      );
      if (!passwordMatch) {
        throw new HttpException('סיסמה אינה נכונה', HttpStatus.BAD_REQUEST);
      }
      console.log('jwt sign');
      const token: string = this.jwtService.sign({
        jti: user._id,
      });

      console.log('update user last logged');
      await this.userModel.updateOne({ _id: user._id }, {
        last_logged: new Date(),
        updated_at: new Date(),
      });
      // if (!updateUserRes) {
      //   throw new HttpException(
      //     'אירעה שגיאה בתהחברות',
      //     HttpStatus.INTERNAL_SERVER_ERROR,
      //   );
      // }

      return { token, user };
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async refreshData (query: UpdateAuthDto) {
    try {
      const { token } = query
      const [bearer, tokenValue] =
        token?.includes('%20') ? token?.split('%20') :  token?.split(' ')
      if (!bearer || !tokenValue) {
        throw new HttpException('No Token Received', HttpStatus.BAD_REQUEST)
      }
      const userJwt = this.jwtService.verify(tokenValue)
      if (!userJwt?.jti) {
        throw new HttpException('No Valid Token', HttpStatus.BAD_REQUEST)
      }
      const user: User | null = await this.userModel.findById(userJwt.jti)
      if (!user) {
        throw new HttpException('No User Found', HttpStatus.NOT_FOUND)
      }
      return user
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
