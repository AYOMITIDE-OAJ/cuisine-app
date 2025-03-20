import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CuisinesService } from './cuisines.service';
import { CreateCuisineDto } from './dto/cuisines.dto';

@Controller('cuisines')
export class CuisinesController {
  constructor(private readonly cuisinesService: CuisinesService) {}

  @Get()
  async getCuisines() {
    return this.cuisinesService.getCuisines();
  }

  @Get('set-menus')
  async getSetMenus(@Query('slug') cuisineSlug?: string) {
    return this.cuisinesService.getSetMenus(cuisineSlug);
  }

  @Post()
  async createCuisine(
    @Body(new ValidationPipe()) createCuisineDto: CreateCuisineDto,
  ): Promise<any> {
    return this.cuisinesService.createCuisine(createCuisineDto);
  }
}
