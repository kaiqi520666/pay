// channel.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserChannelEntity } from './user_channel.entity';

@Entity('channel')
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // rate: number;
  @Column({ type: 'decimal', precision: 5, scale: 1 })
  rate: number;

  @Column()
  enabled: boolean;

  //user_channels: UserChannelEntity[];
  @OneToMany(() => UserChannelEntity, userChannel => userChannel.channel)
  user_channels: UserChannelEntity[];
}
