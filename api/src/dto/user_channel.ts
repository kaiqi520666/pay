import { Rule, RuleType } from '@midwayjs/validate';

export class FindUserChannelsDTO {
  @Rule(RuleType.number())
  user_id: number;
  @Rule(RuleType.string())
  user_name: string;
}

export class UpdateUserChannelDTO {
  @Rule(RuleType.number())
  id: number;
  @Rule(RuleType.number())
  rate: number;
  @Rule(RuleType.boolean())
  enabled: boolean;
}

export class AddUserChannelDTO {
  @Rule(RuleType.number())
  user_id: number;
  @Rule(RuleType.number())
  channel_id: number;
}
