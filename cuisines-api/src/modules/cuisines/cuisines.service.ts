import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisines.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CuisinesService {
  constructor(
    @InjectRepository(Cuisine)
    private cuisineRepository: Repository<Cuisine>,
  ) {}

  async getCuisines(): Promise<Cuisine[]> {
    return this.cuisineRepository.find({
      order: { numberOfOrders: 'DESC' },
    });
  }

  async getSetMenus(cuisineSlug?: string): Promise<any> {
    const query = this.cuisineRepository
      .createQueryBuilder('cuisine')
      .leftJoinAndSelect('cuisine.setMenus', 'setMenus')
      .where('setMenus.isLive = :isLive', { isLive: true });

    if (cuisineSlug) {
      query.andWhere('cuisine.slug = :slug', { slug: cuisineSlug });
    }

    return query.getMany();
  }
}
