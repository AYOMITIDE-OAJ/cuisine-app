import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisines.entity';
import { Repository } from 'typeorm';
import { ErrorHelper } from 'src/core/helpers';
import { HarvestService } from '../harvest/harvest.service';
import { SetMenu } from './entities/setMenu.entity';

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

  async getSetMenus(cuisineSlug?: string): Promise<any> {
    try {
      const query = this.setMenuRepository
        .createQueryBuilder('setMenu')
        .leftJoinAndSelect('setMenu.cuisines', 'cuisine')
        .where('setMenu.isLive = :isLive', { isLive: true })
        .orderBy('setMenu.number_of_orders', 'DESC');

      if (cuisineSlug) {
        query.andWhere('cuisine.slug = :slug', { slug: cuisineSlug });
      }

      return query.getMany();
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }

  async syncCuisines() {
    return this.harvestService.harvestSetMenus();
  }
}
