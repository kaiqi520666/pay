import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AccountCategoryEntity } from './account_category.entity';

import { BaseEntity } from './base.entity';
import { WithdrawEntity } from './withdraw.entity';
import { OrderEntity } from './order.entity';

import { UserEntity } from './user.entity';
@Entity('account_change')
export class AccountChangeEntity extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  before: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  after: number;

  @ManyToOne(() => UserEntity, user => user.account_changes)
  user: UserEntity;

  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity;

  @OneToOne(() => WithdrawEntity)
  @JoinColumn()
  withdraw: WithdrawEntity;
  @ManyToOne(
    () => AccountCategoryEntity,
    account_category => account_category.account_changes
  )
  account_category: AccountCategoryEntity;
}
