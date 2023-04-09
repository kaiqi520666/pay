//  user_channel.controller.ts
import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuard,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Role } from '../decorator/role.decorator';
import { FindWithDrawsDTO } from '../dto/withdraw';
import { AuthGuard } from '../guard/auth.guard';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { WithdrawService } from '../service/withdraw.service';
import { BaseController } from './base.controller';
import { get_find_withdraws_query } from '../utils/common';
@UseGuard(AuthGuard)
@Controller('/api/withdraw', { middleware: [JwtPassportMiddleware] })
export class WithdrawController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  withdrawService: WithdrawService;

  @Role(['merchant', 'admin'])
  @Post('/find_withdraws')
  async find_withdraws(
    @Body(ALL) body: FindWithDrawsDTO,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    const role = this.ctx.state.user.role;
    const user_id = this.ctx.state.user.id;
    const query = get_find_withdraws_query(role, user_id, body);
    query['offset'] = offset;
    query['limit'] = limit;
    const records = await this.withdrawService.find_withdraws(query);
    return this.success({ records });
  }
}
