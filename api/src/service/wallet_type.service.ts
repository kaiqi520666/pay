import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { WalletTypeEntity } from '../entity/wallet_type.entity';

@Provide()
export class WalletTypeService {
  @InjectEntityModel(WalletTypeEntity)
  walletTypeModel: Repository<WalletTypeEntity>;

  async find_wallet_types() {
    return await this.walletTypeModel.find();
  }
}
