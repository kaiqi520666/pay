import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

// Path: src/entity/withdraw.entity.ts
@Entity('pay')
export class PayEntity extends BaseEntity {
  //订单号
  @Index('pay_order_id', { unique: true })
  @Column({ length: 50, unique: true })
  order_id: string;
  //充值金额
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
  //充值状态
  @Column({ default: 1 })
  status: number;
  // 关联user表
  @ManyToOne(() => UserEntity, user => user.pays)
  user: UserEntity;
}
