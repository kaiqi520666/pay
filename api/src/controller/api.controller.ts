import { Inject, Controller, Post, Body, ALL } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CreateOrderDTO } from '../dto/order';

import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';

import { OrderService } from '../service/order.service';
import { UserChannelService } from '../service/user_channel.service';
import { create_order_id } from '../utils/common';
import { BaseController } from './base.controller';

@Controller('/api')
export class APIController extends BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  orderService: OrderService;

  @Inject()
  userChannelService: UserChannelService;
  @Post('/create_order')
  async create_order(@Body(ALL) body: CreateOrderDTO) {
    const order = new OrderEntity();
    order.order_id = create_order_id('W');
    // order.out_order_id = body.out_order_id;
    order.out_order_id = create_order_id('S');
    const user = new UserEntity();
    user.id = body.user_id;
    order.user = user;
    order.amount = body.amount;
    const user_channel = await this.userChannelService.find_user_channel(
      user.id,
      body.channel_id
    );
    if (!user_channel) {
      return this.error(500, { error: '通道不存在' });
    } else if (!user_channel.enabled) {
      return this.error(501, { error: '通道未启用' });
    }
    order.user_channel = user_channel;
    order.rate = user_channel.rate;
    order.notify_url = body.notify_url;
    order.settle_amount = body.amount * (1 - user_channel.rate / 100);
    const records = await this.orderService.create_order(order);

    return this.success({ records });
  }
}
