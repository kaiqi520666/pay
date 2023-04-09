import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { AccountChangeEntity } from '../entity/account_change.entity';

@Provide()
export class AccountChangeService {
  @InjectEntityModel(AccountChangeEntity)
  accountChangeModel: Repository<AccountChangeEntity>;

  async find_account_changes(query: any) {
    return await this.accountChangeModel
      .createQueryBuilder('account_change')
      .innerJoin('account_change.user', 'user')
      .innerJoin('account_change.account_category', 'account_category')
      .leftJoin('account_change.order', 'order')
      .leftJoin('account_change.withdraw', 'withdraw')
      .where(query.str, query.obj)
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('account_change.id', 'DESC')
      .select([
        'order.id',
        'order.order_id',
        'account_change.amount',
        'account_change.before',
        'account_change.after',
        'account_change.create_time',
        'account_category.name',
        'account_category.operate',
        'withdraw.order_id',
        'user.id',
        'user.username',
      ])
      .getManyAndCount();
  }

  async save_account_change(accountChange: AccountChangeEntity) {
    return await this.accountChangeModel.save(accountChange);
  }
}
