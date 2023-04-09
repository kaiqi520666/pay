import { Rule, RuleType } from '@midwayjs/validate';

export class CreateOrderDTO {
  //商户ID
  @Rule(RuleType.number().required())
  user_id: number;
  //商户订单号
  @Rule(RuleType.string().min(10).max(20).required())
  out_order_id: string;
  //支付金额
  @Rule(RuleType.number().required())
  amount: number;
  //通道ID
  @Rule(RuleType.number().required())
  channel_id: number;
  //回调地址
  @Rule(RuleType.string().required())
  notify_url: string;
}
export class FindOrdersDTO {
  @Rule(RuleType.number())
  user_id: number;
  @Rule(RuleType.number())
  channel_id: number;
  @Rule(RuleType.string())
  order_id: string;
  @Rule(RuleType.string())
  out_order_id: string;
  @Rule(RuleType.string())
  start_time: string;
  @Rule(RuleType.string())
  end_time: string;
  @Rule(RuleType.number())
  status: number;
}
