// user登录ip表
// Path: src/entity/user_login.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('user_login')
export class UserLoginEntity extends BaseEntity {
  @Column({ length: 100 })
  ip: string;
  @ManyToOne(() => UserEntity, user => user.user_logins)
  user: UserEntity;
}
