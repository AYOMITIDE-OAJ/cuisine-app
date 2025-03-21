import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuisine } from '../cuisines/entities/cuisines.entity';
import { Repository } from 'typeorm';
import { SetMenu } from '../cuisines/entities/setMenu.entity';
import axios from 'axios';
import { ErrorHelper } from 'src/core/helpers';

@Injectable()
export class HarvestService {
  private readonly logger = new Logger(HarvestService.name);
  private readonly API_URL =
    'https://staging.yhangry.com/booking/test/set-menus';
  constructor(
    @InjectRepository(Cuisine)
    private readonly cuisineRepository: Repository<Cuisine>,
    @InjectRepository(SetMenu)
    private readonly setMenuRepository: Repository<SetMenu>,
  ) {}

  async harvestSetMenus(): Promise<boolean> {
    try {
      const response = await axios.get(this.API_URL);
      const { data } = response.data;

      // verify structure
      if (!data) {
        ErrorHelper.BadRequestException(
          'Invalid API response format: Missing setMenus',
        );
      }

      for (const setMenuData of data) {
        // Get or Create Cuisines
        const cuisineEntities: Cuisine[] = [];
        for (const cuisineData of setMenuData.cuisines) {
          let cuisine = await this.cuisineRepository.findOne({
            where: { id: cuisineData.id },
          });
          if (!cuisine) {
            cuisine = this.cuisineRepository.create({
              id: cuisineData.id,
              name: cuisineData.name,
              slug: cuisineData.name,
              number_of_orders: setMenuData.number_of_orders,
            });
            cuisine = await this.cuisineRepository.save(cuisine);
          }
          cuisineEntities.push(cuisine);
        }

        // Create and Save SetMenu
        const setMenuEntity = this.setMenuRepository.create({
          created_at: setMenuData.created_at,
          description: setMenuData.description,
          display_text: setMenuData.display_text,
          image: setMenuData.image,
          thumbnail: setMenuData.thumbnail,
          is_vegan: setMenuData.is_vegan,
          is_vegetarian: setMenuData.is_vegetarian,
          name: setMenuData.name,
          status: setMenuData.status,
          groups: setMenuData.groups,
          price_per_person: setMenuData.price_per_person,
          min_spend: setMenuData.min_spend,
          is_seated: setMenuData.is_seated,
          is_standing: setMenuData.is_standing,
          is_canape: setMenuData.is_canape,
          is_mixed_dietary: setMenuData.is_mixed_dietary,
          is_meal_prep: setMenuData.is_meal_prep,
          is_halal: setMenuData.is_halal,
          is_kosher: setMenuData.is_kosher,
          price_includes: setMenuData.price_includes,
          highlight: setMenuData.highlight,
          available: setMenuData.available,
          number_of_orders: setMenuData.number_of_orders,
          cuisines: cuisineEntities, // Assign the cuisine entities to the set menu
          isLive: true,
        });

        await this.setMenuRepository.save(setMenuEntity);
      }
      return true;
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }
}
