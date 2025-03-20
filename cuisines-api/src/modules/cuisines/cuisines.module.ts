import { Module } from '@nestjs/common';
import { CuisinesController } from './cuisines.controller';
import { CuisinesService } from './cuisines.service';

@Module({
  controllers: [CuisinesController],
  providers: [CuisinesService]
})
export class CuisinesModule {}
