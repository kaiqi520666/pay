import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel, TypeORMDataSourceManager } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AccountChangeEntity } from '../entity/account_change.entity';
import { AccountCategoryEntity } from '../entity/account_category.entity';
import { AddUserAmountDTO } from '../dto/user';
import { OrderEntity } from '../entity/order.entity';
import { WithdrawEntity } from '../entity/withdraw.entity';
import { PayEntity } from '../entity/pay.entity';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;
  @Inject()
  dataSourceManager: TypeORMDataSourceManager;

  async find_users(query: any) {
    return await this.userModel
      .createQueryBuilder('user')
      .innerJoin('user.wallet_type', 'wallet_type')
      .where(query.str, query.obj)
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('user.id', 'DESC')
      .select([
        'user.id',
        'user.username',
        'user.amount',
        'user.enabled',
        'user.create_time',
        'user.role',
        'user.login_ip',
        'user.interface_ip',
        'user.secret_key',
        'user.wallet_address',
        'wallet_type.id',
        'wallet_type.name',
      ])
      .getManyAndCount();
  }

  async find_user_by_id(id: number) {
    return await this.userModel.findOne({
      where: { id: id },
    });
  }

  async login(data: UserEntity) {
    return await this.userModel.findOne({
      where: { username: data.username, password: data.password },
    });
  }

  async add_user(data: UserEntity) {
    const user = await this.userModel.findOne({
      where: { username: data.username },
    });
    if (user) {
      return null;
    } else {
      return await this.userModel.save(data);
    }
  }

  async find_user(query: any) {
    return await this.userModel.findOne({
      where: { id: query.obj.user_id },
      relations: ['wallet_type'],
    });
  }

  async update_user(data: UserEntity) {
    return await this.userModel.save(data);
  }

  async add_user_amount(
    add_user_amount_dto: AddUserAmountDTO,
    order: OrderEntity = undefined,
    withdraw: WithdrawEntity = undefined,
    pay: PayEntity = undefined
  ) {
    const dataSource = this.dataSourceManager.getDataSource('default');
    await dataSource.transaction(async transactionalEntityManager => {
      const user = await transactionalEntityManager.findOne(UserEntity, {
        where: { id: add_user_amount_dto.user_id },
      });
      const account_category = await transactionalEntityManager.findOne(
        AccountCategoryEntity,
        {
          where: { id: add_user_amount_dto.account_category_id },
        }
      );
      const account_change = new AccountChangeEntity();
      account_change.user = user;
      account_change.account_category = account_category;
      const amount = Number(
        add_user_amount_dto.amount * account_category.operate
      );
      const before_amount = Number(user.amount);
      const after_amount = Number(user.amount) + amount;
      account_change.amount = amount;
      account_change.before = before_amount;
      account_change.after = after_amount;
      user.amount = after_amount;
      await transactionalEntityManager.save(user);

      if (order)
        account_change.order = await transactionalEntityManager.save(order);
      if (withdraw)
        account_change.withdraw = await transactionalEntityManager.save(
          withdraw
        );
      if (pay) account_change.pay = await transactionalEntityManager.save(pay);

      await transactionalEntityManager.save(account_change);
    });
  }
}
