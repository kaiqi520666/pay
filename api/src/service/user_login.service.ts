// user_login.service.ts
// Path: src/service/user_login.service.ts
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginEntity } from '../entity/user_login.entity';
@Provide()
export class UserLoginService {
  @InjectEntityModel(UserLoginEntity)
  userLoginModel: Repository<UserLoginEntity>;
  async saveUserLogin(userLogin: UserLoginEntity) {
    return await this.userLoginModel.save(userLogin);
  }
}
