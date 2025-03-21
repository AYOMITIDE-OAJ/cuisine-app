import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { SetMenu } from './setMenu.entity';

@Entity()
export class Cuisine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  number_of_orders: number;

  @ManyToMany(() => SetMenu, (setMenu) => setMenu.cuisines)
  @JoinTable({
    name: 'set_menu_cuisines_cuisine',
    joinColumn: { name: 'cuisineId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'setMenuId', referencedColumnName: 'id' },
  })
  setMenus: SetMenu[];

  @Column({ default: 0 })
  setMenusCount: number;
}
