// 取款表

import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

// Path: src/entity/withdraw.entity.ts
@Entity('withdraw')
export class WithdrawEntity extends BaseEntity {
  //订单号
  @Index('withdraw_order_id', { unique: true })
  @Column({ length: 50, unique: true })
  order_id: string;
  //取款金额
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
  //取款状态
  @Column({ default: 1 })
  status: number;
  //取款地址
  @Column({ length: 200 })
  wallet_address: string;
  //取款手续费
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fee: number;
  //钱包类型
  @Column({ length: 50 })
  wallet_type_name: string;
  // 关联user表
  @ManyToOne(() => UserEntity, user => user.withdraws)
  user: UserEntity;
}
