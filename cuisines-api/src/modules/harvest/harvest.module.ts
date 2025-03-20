import { Module } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuisine } from '../cuisines/entities/cuisines.entity';
import { SetMenu } from '../cuisines/entities/setMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuisine, SetMenu])],
  providers: [HarvestService],
})
export class HarvestModule {}
