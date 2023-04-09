import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { AccountChangeService } from '../service/account_change.service';

import { BaseController } from './base.controller';
import { Role } from '../decorator/role.decorator';
import { get_find_account_change_query } from '../utils/common';
import { FindAccountChangeDTO } from '../dto/account_change';
import { ALL, Body, Controller, Inject, Post, Query } from '@midwayjs/core';

@Controller('/api/account_change', { middleware: [JwtPassportMiddleware] })
export class AccountChangeController extends BaseController {
  @Inject()
  accountChangeService: AccountChangeService;
  @Inject()
  ctx: Context;

  @Role(['merchant', 'admin'])
  @Post('/find_account_changes')
  async find_account_changes(
    @Body(ALL) body: FindAccountChangeDTO,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    const role = this.ctx.state.user.role;
    const user_id = this.ctx.state.user.id;
    const query = get_find_account_change_query(role, user_id, body);
    query['offset'] = offset;
    query['limit'] = limit;
    const records = await this.accountChangeService.find_account_changes(query);
    return this.success({ records });
  }
}
