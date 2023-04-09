import { Rule, RuleType } from '@midwayjs/validate';
export class FindWithDrawsDTO {
  @Rule(RuleType.string())
  order_id: string;
  @Rule(RuleType.string())
  wallet_address: string;
  @Rule(RuleType.string())
  start_time: string;
  @Rule(RuleType.string())
  end_time: string;
  @Rule(RuleType.number())
  status: number;
}
