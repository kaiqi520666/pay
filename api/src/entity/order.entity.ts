import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ChannelEntity } from './channel.entity';

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
  //附加信息
  @Column({ length: 50 })
  extra: string;
  //回调地址
  @Column({ length: 200 })
  notify_url: string;
  //关联用户通道
  @ManyToOne(() => ChannelEntity, channel => channel.orders)
  channel: ChannelEntity;
  //商户
  @ManyToOne(() => UserEntity, user => user.orders)
  user: UserEntity;
}
