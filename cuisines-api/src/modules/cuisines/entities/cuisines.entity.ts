import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SetMenu } from './setMenu.entity';

@Entity()
export class Cuisine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  //   @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  numberOfOrders: number;

  @OneToMany(() => SetMenu, (setMenu) => setMenu.cuisine)
  setMenus: SetMenu[];

  @Column({ default: 0 })
  setMenusCount: number;
}
