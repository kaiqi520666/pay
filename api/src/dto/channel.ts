import { Rule, RuleType } from '@midwayjs/validate';

export class UpdateChannelDTO {
  @Rule(RuleType.number().required())
  id: string;
  @Rule(RuleType.string().required())
  name: string;
  @Rule(RuleType.number().required())
  rate: number;
  @Rule(RuleType.boolean().required())
  enabled: boolean;
}

export class FindNotUserChannelsDTO {
  @Rule(RuleType.number())
  user_id: number;
}
