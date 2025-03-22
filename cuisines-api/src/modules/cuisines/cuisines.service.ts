import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisines.entity';
import { Repository } from 'typeorm';
import { ErrorHelper } from 'src/core/helpers';
import { HarvestService } from '../harvest/harvest.service';
import { SetMenu } from './entities/setMenu.entity';
import { PaginationDto, PaginationResultDto } from 'src/lib/util/dto';
import { Cache } from 'cache-manager';

@Injectable()
export class CuisinesService {
  constructor(
    @InjectRepository(Cuisine)
    private cuisineRepository: Repository<Cuisine>,
    @InjectRepository(SetMenu)
    private setMenuRepository: Repository<SetMenu>,
    private readonly harvestService: HarvestService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache, // ✅ Inject Cache
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

  async getSetMenus(
    cuisineSlug?: string,
    paginationQuery?: PaginationDto,
  ): Promise<any> {
    try {
      const limit = paginationQuery.limit || 6;
      const page = paginationQuery.page || 1;
      const cacheKey = `setMenus_${cuisineSlug}_${page}_${limit}`;
      const cachedData = await this.cacheManager.get(cacheKey);

      if (cachedData) return cachedData;

      const skip = Math.max((page - 1) * limit, 0);

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
      const result = new PaginationResultDto(data, count, { limit, page });

      await this.cacheManager.set(cacheKey, result, 300);
      return result;
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async syncCuisines() {
    return this.harvestService.harvestSetMenus();
  }
}
