//  user_channel.controller.ts
import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuard,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Role } from '../decorator/role.decorator';
import { FindOrdersDTO } from '../dto/order';
import { AuthGuard } from '../guard/auth.guard';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { OrderService } from '../service/order.service';
import { get_find_orders_query } from '../utils/common';
import { BaseController } from './base.controller';

const moment = require('moment');

@UseGuard(AuthGuard)
@Controller('/api/order', { middleware: [JwtPassportMiddleware] })
export class OrderController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  orderService: OrderService;

  @Role(['merchant', 'admin'])
  @Post('/find_orders')
  async find_orders(
    @Body(ALL) body: FindOrdersDTO,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    const role = this.ctx.state.user.role;
    const user_id = this.ctx.state.user.id;
    const query = get_find_orders_query(role, user_id, body);
    query['offset'] = offset;
    query['limit'] = limit;
    const records = await this.orderService.find_orders(query);
    return this.success({ records });
  }

  @Role(['merchant'])
  @Get('/find_24h_order_by_user_id')
  async find_24h_order_by_user_id() {
    const id = this.ctx.state.user.id;
    const date = moment().format('YYYY-MM-DD');
    const orders = await this.orderService.find_24h_order_by_user_id(id, date);
    return this.success({ orders });
  }
}
