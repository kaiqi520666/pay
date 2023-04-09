import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountChangeEntity } from './account_change.entity';

@Entity('account_category')
export class AccountCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false, type: 'varchar' })
  name: string;

  @Column({ default: 1 })
  operate: number;

  @OneToMany(
    () => AccountChangeEntity,
    account_change => account_change.account_category
  )
  account_changes: AccountChangeEntity[];
}
