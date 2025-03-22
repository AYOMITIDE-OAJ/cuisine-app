import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CuisinesController } from './cuisines.controller';
import { CuisinesService } from './cuisines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisines.entity';
import { SetMenu } from './entities/setMenu.entity';
import { HarvestService } from '../harvest/harvest.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300000, // Cache expires in 5 minutes (milliseconds)
      max: 100, // Maximum cache items
    }),
    TypeOrmModule.forFeature([Cuisine, SetMenu]),
  ],
  controllers: [CuisinesController],
  providers: [CuisinesService, HarvestService],
})
export class CuisinesModule {}
