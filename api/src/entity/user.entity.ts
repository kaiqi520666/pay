import { Entity, Column, OneToMany, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderEntity } from './order.entity';
import { UserChannelEntity } from './user_channel.entity';
import { UserLoginEntity } from './user_login.entity';
import { WalletTypeEntity } from './wallet_type.entity';
import { WithdrawEntity } from './withdraw.entity';
import { AccountChangeEntity } from './account_change.entity';

enum Role {
  ADMIN = 'admin',
  MERCHANT = 'merchant',
}

@Entity('user')
export class UserEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ length: 50, unique: true })
  username: string;
  @Column({ select: false, length: 50 })
  password: string;
  @Column({ type: 'enum', enum: Role, default: Role.MERCHANT })
  role: Role;
  // amount: number;
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  amount: number;
  // login_ip: string;
  @Column({ default: '', length: 20 })
  login_ip: string;
  // interface_ip: string;
  @Column({ default: '', length: 20 })
  interface_ip: string;

  // secret_key: string;
  @Column({ default: '', length: 50 })
  secret_key: string;

  @Column({ length: 200, default: '' })
  wallet_address: string;

  @Column({ default: true })
  enabled: boolean;

  @OneToMany(() => UserLoginEntity, user_login => user_login.user)
  user_logins: UserLoginEntity[];

  //user_channels: UserChannelEntity[];
  @OneToMany(() => UserChannelEntity, user_channel => user_channel.user)
  user_channels: UserChannelEntity[];

  //orders: OrderEntity[];
  @OneToMany(() => OrderEntity, order => order.user)
  orders: OrderEntity[];

  //withdraws: WithdrawEntity[];
  @OneToMany(() => WithdrawEntity, withdraw => withdraw.user)
  withdraws: WithdrawEntity[];

  @ManyToOne(() => WalletTypeEntity, wallet_type => wallet_type.users)
  wallet_type: WalletTypeEntity;

  @OneToMany(() => AccountChangeEntity, account_change => account_change.user)
  account_changes: AccountChangeEntity[];
}
