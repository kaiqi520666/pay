import { ALL, Body, Controller, Inject, Post, UseGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Role } from '../decorator/role.decorator';
import { FindUserDTO, UpdateUserDTO } from '../dto/user';
import { UserEntity } from '../entity/user.entity';
import { WalletTypeEntity } from '../entity/wallet_type.entity';
import { AuthGuard } from '../guard/auth.guard';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';

@UseGuard(AuthGuard)
@Controller('/api/user', { middleware: [JwtPassportMiddleware] })
export class UserController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  userService: UserService;

  @Role(['admin'])
  @Post('/find_users')
  async findUsers(@Body(ALL) body: any) {
    const records = await this.userService.find_users();
    return this.success({ records });
  }
  @Role(['merchant', 'admin'])
  @Post('/find_user')
  async find_user(@Body(ALL) body: FindUserDTO) {
    const role = this.ctx.state.user.role;
    const query = {
      str: 'user.id = :user_id',
      obj: { user_id: this.ctx.state.user.id },
    };
    if (role === 'admin') {
      query.obj = { user_id: body.user_id };
    }
    const records = await this.userService.find_user(query);
    return this.success({ records });
  }
  @Role(['merchant', 'admin'])
  @Post('/update_user')
  async update_user(@Body(ALL) body: UpdateUserDTO) {
    const user = new UserEntity();
    user.id = this.ctx.state.user.id;
    const role = this.ctx.state.user.role;
    if (role === 'admin') {
      user.id = body.id;
      user.enabled = body.enabled;
    }
    if (body.password) {
      user.password = body.password;
    }
    user.login_ip = body.login_ip;
    user.interface_ip = body.interface_ip;
    user.secret_key = body.secret_key;
    user.wallet_address = body.wallet_address;
    const wallet_type = new WalletTypeEntity();
    wallet_type.id = body.wallet_type_id;
    user.wallet_type = wallet_type;
    const result = await this.userService.update_user(user);
    if (result) {
      return this.success();
    } else {
      return this.error();
    }
  }
}
