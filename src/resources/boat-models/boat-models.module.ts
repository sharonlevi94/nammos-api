import { Module } from '@nestjs/common';
import { BoatModelsService } from './boat-models.service';
import { BoatModelsController } from './boat-models.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BoatModel, BoatModelSchema } from './entities/boat-model.entity';

@Module({
  controllers: [BoatModelsController],
  providers: [BoatModelsService],
  imports: [
    MongooseModule.forFeature([
      { name: BoatModel.name, schema: BoatModelSchema },
    ]),
  ],
})
export class BoatModelsModule {}
