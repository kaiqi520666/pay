// user_channel表
// Path: src/entity/user_channel.entity.ts
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ChannelEntity } from './channel.entity';

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
}
