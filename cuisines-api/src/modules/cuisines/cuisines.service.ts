import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisines.entity';
import { Repository } from 'typeorm';
import { ErrorHelper } from 'src/core/helpers';
import { CreateCuisineDto } from './dto/cuisines.dto';

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

  async createCuisine(createCuisineDto: CreateCuisineDto): Promise<Cuisine> {
    const { name, slug } = createCuisineDto;

    // Just to confirm if cuisine with the same name or slug already exists
    const existingCuisine = await this.cuisineRepository.findOne({
      where: [{ name }, { slug }],
    });

    if (existingCuisine) {
      ErrorHelper.BadRequestException(
        `Cuisine with this name: ${name} or slug: ${slug} already exists`,
      );
    }

    const cuisine = this.cuisineRepository.create({
      name,
      slug,
    });

    return this.cuisineRepository.save(cuisine);
  }
}
