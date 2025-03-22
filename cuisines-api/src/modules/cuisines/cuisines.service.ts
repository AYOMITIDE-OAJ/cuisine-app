import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisines.entity';
import { Repository } from 'typeorm';
import { ErrorHelper } from 'src/core/helpers';
import { HarvestService } from '../harvest/harvest.service';
import { SetMenu } from './entities/setMenu.entity';
import { PaginationDto, PaginationResultDto } from 'src/lib/util/dto';

@Injectable()
export class CuisinesService {
  constructor(
    @InjectRepository(Cuisine)
    private cuisineRepository: Repository<Cuisine>,
    @InjectRepository(SetMenu)
    private setMenuRepository: Repository<SetMenu>,
    private readonly harvestService: HarvestService,
  ) {}

  async getCuisines(): Promise<Cuisine[]> {
    try {
      return await this.cuisineRepository.find({
        order: { number_of_orders: 'DESC' },
      });
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async getSetMenusx(
    cuisineSlug?: string,
    paginationQuery?: PaginationDto,
  ): Promise<any> {
    try {
      const { limit, page } = paginationQuery;
      const skip = (page - 1) * limit;

      const query = this.setMenuRepository
        .createQueryBuilder('setMenu')
        .leftJoinAndSelect('setMenu.cuisines', 'cuisine')
        .where('setMenu.isLive = :isLive', { isLive: true })
        .orderBy('setMenu.number_of_orders', 'DESC')
        .skip(skip)
        .take(limit);

      if (cuisineSlug) {
        query.andWhere('cuisine.slug = :slug', { slug: cuisineSlug });
      }

      const [data, count] = await query.getManyAndCount();

      return new PaginationResultDto(data, count, { limit, page });
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async getSetMenus(
    cuisineSlug?: string,
    paginationQuery?: PaginationDto,
  ): Promise<any> {
    try {
      const { limit, page } = paginationQuery;
      const skip = Math.max((page - 1) * limit, 0);

      const query = this.setMenuRepository
        .createQueryBuilder('setMenu')
        .leftJoinAndSelect('setMenu.cuisines', 'cuisine')
        .where('setMenu.isLive = :isLive', { isLive: true })
        .orderBy('setMenu.number_of_orders', 'DESC')
        .skip(skip)
        .take(limit);

      if (cuisineSlug) {
        query
          .andWhere('cuisine.slug = :slug')
          .setParameters({ slug: cuisineSlug });
      }

      const [data, count] = await query.getManyAndCount();

      // Return paginated result with metadata
      return new PaginationResultDto(data, count, {
        limit,
        page,
      });
    } catch (error) {
      throw ErrorHelper.BadRequestException(error);
    }
  }

  async syncCuisines() {
    return this.harvestService.harvestSetMenus();
  }
}
