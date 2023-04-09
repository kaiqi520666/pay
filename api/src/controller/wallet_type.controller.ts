import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { WalletTypeService } from '../service/wallet_type.service';
import { BaseController } from './base.controller';

@Controller('/api/wallet_type')
export class HomeController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  walletTypeService: WalletTypeService;
  @Get('/find_wallet_types')
  async find_wallet_types() {
    const records = await this.walletTypeService.find_wallet_types();
    return this.success({ records });
  }
}
