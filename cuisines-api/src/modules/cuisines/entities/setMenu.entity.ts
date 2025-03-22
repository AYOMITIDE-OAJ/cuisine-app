import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Cuisine } from './cuisines.entity';
@Entity()
export class SetMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @ManyToMany(() => Cuisine)
  @JoinTable({
    name: 'set_menu_cuisines_cuisine',
    joinColumn: { name: 'setMenuId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'cuisineId', referencedColumnName: 'id' },
  })
  cuisines: Cuisine[];

  @Column({ nullable: true })
  description: string;

  @Column()
  display_text: number;

  @Column()
  image: string;

  @Column()
  thumbnail: string;

  @Column({ default: false })
  is_vegan: boolean;

  @Column({ default: false })
  is_vegetarian: boolean;

  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'jsonb', nullable: true })
  groups: {
    dishes_count: number;
    selectable_dishes_count: number;
    groups: {
      ungrouped: number;
      Starters?: number;
      Mains?: number;
      Sides?: number;
      Dessert?: number;
    };
  };

  @Column('decimal')
  price_per_person: number;

  @Column('decimal', { nullable: true })
  min_spend?: number;

  @Column({ default: false })
  is_seated: boolean;

  @Column({ default: false })
  is_standing: boolean;

  @Column({ default: false })
  is_canape: boolean;

  @Column({ default: false })
  is_mixed_dietary: boolean;

  @Column({ default: false })
  is_meal_prep: boolean;

  @Column({ default: false })
  is_halal: boolean;

  @Column({ default: false })
  is_kosher: boolean;

  @Column({ nullable: true })
  price_includes: string;

  @Column({ nullable: true })
  highlight: string;

  @Column({ default: true })
  available: boolean;

  @Column({ default: 0 })
  number_of_orders: number;

  @ManyToOne(() => Cuisine, (cuisine) => cuisine.setMenus)
  cuisine: Cuisine;

  @Index() // ✅ Index speeds up filtering
  @Column({ default: true })
  isLive: boolean;
}
