import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cuisine } from './cuisines.entity';

@Entity()
export class SetMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  minSpend?: number;

  @Column()
  thumbnail: string;

  @ManyToOne(() => Cuisine, (cuisine) => cuisine.setMenus)
  cuisine: Cuisine;

  @Column({ default: true })
  isLive: boolean;
}
