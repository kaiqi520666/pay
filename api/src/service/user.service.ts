import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  async find_users(query: any) {
    return await this.userModel
      .createQueryBuilder('user')
      .innerJoin('user.wallet_type', 'wallet_type')
      .where(query.str, query.obj)
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('user.id', 'DESC')
      .select([
        'user.id',
        'user.username',
        'user.amount',
        'user.enabled',
        'user.create_time',
        'user.role',
        'user.login_ip',
        'user.interface_ip',
        'user.secret_key',
        'user.wallet_address',
        'wallet_type.id',
        'wallet_type.name',
      ])
      .getManyAndCount();
  }

  async login(data: UserEntity) {
    return await this.userModel.findOne({
      where: { username: data.username, password: data.password },
    });
  }

  async add_user(data: UserEntity) {
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
