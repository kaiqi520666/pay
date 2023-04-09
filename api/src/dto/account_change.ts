import { Rule, RuleType } from '@midwayjs/validate';

export class FindAccountChangeDTO {
  @Rule(RuleType.number())
  user_id: number;
  @Rule(RuleType.number())
  account_category_id: number;
  @Rule(RuleType.string())
  order_id: string;
  @Rule(RuleType.string())
  withdraw_id: string;
  @Rule(RuleType.string())
  start_time: string;
  @Rule(RuleType.string())
  end_time: string;
  @Rule(RuleType.number())
  status: number;
}
