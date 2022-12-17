import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { Model } from 'mongoose';
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
        throw { message: '', status: HttpStatus.NOT_FOUND };
      }
      // const existInQueue: Queue | null = await this.queueModel.findOne({
      //   user_id: user._id,
      // })
    } catch (e) {
      console.log('QueueService create', e);
      new HttpException(e?.message, e?.status);
    }
  }

  findAll() {
    return `This action returns all queue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queue`;
  }

  update(id: number, updateQueueDto: UpdateQueueDto) {
    return `This action updates a #${id} queue`;
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }
}
