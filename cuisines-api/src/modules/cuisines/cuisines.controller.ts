import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async getCuisines() {
    const res = await this.cuisinesService.getCuisines();

    return {
      data: res,
      status: 'success',
      message: 'Cuisines Fetched Successfully',
    };
  }

  @Get('set-menus')
  @HttpCode(HttpStatus.OK)
  async getSetMenus(@Query('slug') cuisineSlug?: string) {
    const res = await this.cuisinesService.getSetMenus(cuisineSlug);

    return {
      data: res,
      message: 'Set-Menu Triggered Successfully',
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCuisine(
    @Body(new ValidationPipe()) createCuisineDto: CreateCuisineDto,
  ): Promise<any> {
    const res = await this.cuisinesService.createCuisine(createCuisineDto);

    return {
      data: res,
      message: 'Cuisines Created Successfully',
    };
  }

  @Get('/sync')
  @HttpCode(HttpStatus.CREATED)
  async syncCuisines() {
    const res = await this.cuisinesService.syncCuisines();

    return {
      data: res,
      status: 'success',
      message: 'Cuisines Synced Successfully',
    };
  }
}
