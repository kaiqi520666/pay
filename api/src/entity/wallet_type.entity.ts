import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

//order数据表
@Entity('wallet_type')
export class WalletTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => UserEntity, user => user.wallet_type)
  users: UserEntity[];
}
