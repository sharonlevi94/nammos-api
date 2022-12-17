import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import { Calendar, CalendarSchema } from './entities/calendar.entity';

@Module({
  controllers: [CalendarController],
  providers: [CalendarService],
  imports: [
    MongooseModule.forFeature([{ name: Calendar.name, schema: CalendarSchema },]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class CalendarModule {}
