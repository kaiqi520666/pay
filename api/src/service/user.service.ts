import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  async find_users() {
    return await this.userModel.find({
      relations: ['wallet_type'],
      order: { id: 'DESC' },
    });
  }
  async login(data: UserEntity) {
    return await this.userModel.findOne({
      where: { username: data.username, password: data.password },
    });
  }
  async register(data: UserEntity) {
    const user = await this.userModel.findOne({
      where: { username: data.username },
    });
    if (user) {
      return null;
    } else {
      return await this.userModel.save(data);
    }
  }
  async find_user(query: any) {
    return await this.userModel.findOne({
      where: { id: query.obj.user_id },
      relations: ['wallet_type'],
    });
  }
  async update_user(data: UserEntity) {
    return await this.userModel.save(data);
  }
}
