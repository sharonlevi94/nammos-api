import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { CalendarModule } from './resources/calendar/calendar.module';
import { QueueModule } from './resources/queue/queue.module';
import { BoatModelsModule } from './resources/boat-models/boat-models.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    AuthModule,
    UsersModule,
    CalendarModule,
    QueueModule,
    BoatModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
