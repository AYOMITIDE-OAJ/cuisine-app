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
}
