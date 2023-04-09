import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { UserChannelEntity } from './user_channel.entity';

//order数据表
@Entity('order')
export class OrderEntity extends BaseEntity {
  //平台订单号
  @Index({ unique: true })
  @Column({ length: 50, unique: true })
  order_id: string;
  //商户订单号
  @Index()
  @Column({ length: 50 })
  out_order_id: string;
  //支付金额
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
  //支付状态
  @Column({ default: 1 })
  status: number;
  //结算金额
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  settle_amount: number;
  //费率
  @Column({ type: 'decimal', precision: 5, scale: 1 })
  rate: number;
  //回调地址
  @Column({ length: 200 })
  notify_url: string;
  //关联用户通道
  @ManyToOne(() => UserChannelEntity, user_channel => user_channel.orders)
  user_channel: UserChannelEntity;
  //商户
  @ManyToOne(() => UserEntity, user => user.orders)
  user: UserEntity;
}