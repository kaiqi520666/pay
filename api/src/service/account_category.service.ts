import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelEntity } from '../entity/channel.entity';
import { AccountCategoryEntity } from '../entity/account_category.entity';
@Provide()
export class AccountCategoryService {
  @InjectEntityModel(AccountCategoryEntity)
  accountCategoryModel: Repository<ChannelEntity>;
  async find_account_categories() {
    return await this.accountCategoryModel.find();
  }
}
