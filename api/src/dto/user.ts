import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDTO {
  @Rule(RuleType.string().required())
  username: string;
  @Rule(RuleType.string().required())
  password: string;
}

export class UserRegisterDTO {
  @Rule(RuleType.string().required())
  username: string;
  @Rule(RuleType.string().required())
  password: string;
}

export class FindUserDTO {
  @Rule(RuleType.number())
  user_id: number;
}

export class FindUsersDTO {
  @Rule(RuleType.number())
  user_id: number;
  @Rule(RuleType.string())
  username: string;
}

export class UpdateUserDTO {
  @Rule(RuleType.number())
  id: number;

  @Rule(RuleType.string())
  password: string;

  @Rule(RuleType.string().allow(''))
  login_ip: string;

  @Rule(RuleType.string().allow(''))
  interface_ip: string;

  @Rule(RuleType.string())
  secret_key: string;

  @Rule(RuleType.string().allow(''))
  wallet_address: string;

  @Rule(RuleType.number())
  wallet_type_id: number;

  @Rule(RuleType.boolean())
  enabled: boolean;
}
