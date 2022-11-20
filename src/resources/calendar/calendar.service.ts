import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calendar, CalendarDocument } from './entities/calendar.entity';
import { User, UserDocument } from '../users/entities/user.entity';
import { calendarTimes } from '../../helpers/constants';
import { FindAvailableTimesDto } from './dto/find-available-times.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name) private calendarModel: Model<CalendarDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(createCalendarDto: CreateCalendarDto) {
    try {
      const { user_id, date, time } = createCalendarDto;
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all calendar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calendar`;
  }

  update(id: number, updateCalendarDto: UpdateCalendarDto) {
    return `This action updates a #${id} calendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendar`;
  }

  async findAvailableTimes(query: FindAvailableTimesDto) {
    try {
      const { date } = query;
      const busyTimes: any[] = await this.calendarModel.find(
        { date: date },
        { time: 1 },
      );
      if (!busyTimes.length) {
        return calendarTimes;
      }
      const availableTimes: any = { ...calendarTimes };
      busyTimes.forEach((busyTime) => {
        const busyTimeArr = busyTime.split(':');
        if (availableTimes[busyTimeArr[0]][busyTimeArr[1]]) {
          delete availableTimes[busyTimeArr[0]][busyTimeArr[1]];
        }
      });
      return availableTimes;
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
