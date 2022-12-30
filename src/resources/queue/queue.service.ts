import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { Model, ObjectId } from 'mongoose';
import { Queue, QueueDocument } from './entities/queue.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name) private queueModel: Model<QueueDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(createQueueDto: CreateQueueDto) {
    try {
      const { user_id } = createQueueDto;

      const user: User | null = await this.userModel.findById(user_id);
      if (!user) {
        throw { message: 'המשתמש אינו קיים', status: HttpStatus.NOT_FOUND };
      }
      const existInQueue: Queue | null = await this.queueModel.findOne({
        user_id: user._id,
      });
      if (existInQueue) {
        throw {
          message: 'המשתמש כבר קיים בתור',
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }
      await this.queueModel.create({
        user_id: user._id,
        created_at: new Date(),
      });

      return { success: true };
    } catch (e) {
      console.log('QueueService create', e);
      return new HttpException(e?.message, e?.status);
    }
  }

  async findAll() {
    try {
      return this.queueModel
        .find()
        .populate('user_id', 'full_name')
        .sort({ created_at: 'desc' })
        .exec();
    } catch (e) {
      console.log('QueueService findAll', e);
      new HttpException(e?.message, e?.status);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} queue`;
  }

  update(id: number, updateQueueDto: UpdateQueueDto) {
    return `This action updates a #${id} queue`;
  }

  async remove(id: ObjectId) {
    try {
      const existInQueue: Queue | null = await this.queueModel.findOne({
        user_id: id,
      });
      if (!existInQueue) {
        throw {
          message: 'המשתמש אינו קיים בתור',
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }
      await this.queueModel.remove({ user_id: id });
      return { success: true };
    } catch (e) {
      console.log('QueueService findAll', e);
      new HttpException(e?.message, e?.status);
    }
  }
}
