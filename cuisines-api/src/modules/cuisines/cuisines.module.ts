import { Module } from '@nestjs/common';
import { CuisinesController } from './cuisines.controller';
import { CuisinesService } from './cuisines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisines.entity';
import { SetMenu } from './entities/setMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuisine, SetMenu])],
  controllers: [CuisinesController],
  providers: [CuisinesService],
})
export class CuisinesModule {}
