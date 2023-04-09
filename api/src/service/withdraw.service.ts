import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawEntity } from '../entity/withdraw.entity';

@Provide()
export class WithdrawService {
  @InjectEntityModel(WithdrawEntity)
  withdrawModel: Repository<WithdrawEntity>;

  async find_withdraws(query: any) {
    return await this.withdrawModel
      .createQueryBuilder('withdraw')
      .innerJoin('withdraw.user', 'user')
      .where(query.str, query.obj)
      .offset(query.offset)
      .limit(query.limit)
      .select([
        'withdraw.id',
        'withdraw.order_id',
        'withdraw.amount',
        'withdraw.status',
        'withdraw.wallet_address',
        'withdraw.fee',
        'withdraw.wallet_type_name',
        'withdraw.create_time',
        'withdraw.update_time',
        'user.username',
        'user.id',
      ])
      .getManyAndCount();
  }
}
