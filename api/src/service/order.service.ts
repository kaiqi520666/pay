// order.service.ts
// Path: src/service/order.service.ts
import { Provide } from '@midwayjs/decorator';

import { OrderEntity } from '../entity/order.entity';
import { Repository } from 'typeorm';

import { InjectEntityModel } from '@midwayjs/typeorm';

@Provide()
export class OrderService {
  @InjectEntityModel(OrderEntity)
  orderModel: Repository<OrderEntity>;

  async create_order(order: OrderEntity) {
    return await this.orderModel.save(order);
  }

  async find_orders(query: any) {
    return await this.orderModel
      .createQueryBuilder('order')
      .innerJoin('order.user', 'user')
      .innerJoin('order.channel', 'channel')
      .where(query.str, query.obj)
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('order.id', 'DESC')
      .select([
        'order.id',
        'order.amount',
        'order.status',
        'order.create_time',
        'order.update_time',
        'order.order_id',
        'order.out_order_id',
        'order.notify_url',
        'order.rate',
        'order.settle_amount',
        'user.id',
        'user.username',
        'channel.name',
      ])
      .getManyAndCount();
  }

  async find_24h_order_by_user_id(id: number, date: string) {
    const sql = `SELECT DATE_FORMAT(o.\`create_time\`, "%H") AS hours,SUM(o.amount) AS amount FROM \`order\` o join \`user\` u on o.userId=u.id where u.id=${id} and o.create_time>"${date}" GROUP BY hours;`;
    return this.orderModel.query(sql);
  }
}
