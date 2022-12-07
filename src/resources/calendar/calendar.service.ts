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
      const user: User | null = await this.userModel.findById(
        createCalendarDto?.user_id,
      );
      if (!user) {
        throw new HttpException('שם המשתמש אינו נמצא', HttpStatus.NOT_FOUND);
      }
      return this.calendarModel.create(createCalendarDto);
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const events: Calendar[] | null = await this.calendarModel
        .find()
        .populate('user_id', 'full_name')
        .exec();

      return events?.map((event) => {
        return {
          start: event.date + ' ' + event?.time,
          name: event?.user_id?.full_name,
        };
      });
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
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
        const busyTimeArr = busyTime?.time?.split(':');
        const hour = parseInt(busyTimeArr[0], 10);
        const minute = parseInt(busyTimeArr[1], 10);
        const index = availableTimes[hour]?.findIndex(
          (min: number) => min === minute,
        );
        if (index !== -1) {
          availableTimes[hour].splice(index, 1);
        }
      });
      return availableTimes;
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
