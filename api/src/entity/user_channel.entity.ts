// user_channel表
// Path: src/entity/user_channel.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ChannelEntity } from './channel.entity';
import { OrderEntity } from './order.entity';
@Entity('user_channel')
export class UserChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: true })
  enabled: boolean;
  @Column({ type: 'decimal', precision: 5, scale: 1 })
  rate: number;
  @ManyToOne(() => UserEntity, user => user.user_channels)
  user: UserEntity;
  @ManyToOne(() => ChannelEntity, channel => channel.user_channels)
  channel: ChannelEntity;
  @OneToMany(() => OrderEntity, order => order.user_channel)
  orders: OrderEntity[];
}
