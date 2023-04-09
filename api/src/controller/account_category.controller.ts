import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { BaseController } from './base.controller';
import { Role } from '../decorator/role.decorator';
import { AccountCategoryService } from '../service/account_category.service';

@Controller('/api/account_category', { middleware: [JwtPassportMiddleware] })
export class AccountChangeController extends BaseController {
  @Inject()
  accountCategoryService: AccountCategoryService;
  @Inject()
  ctx: Context;

  @Role(['merchant', 'admin'])
  @Get('/find_account_categories')
  async find_account_categories() {
    const records = await this.accountCategoryService.find_account_categories();
    return this.success({ records });
  }
}
