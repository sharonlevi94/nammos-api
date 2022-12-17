import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import { Queue, QueueSchema } from './entities/queue.entity';

@Module({
  controllers: [QueueController],
  providers: [QueueService],
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class QueueModule {}
