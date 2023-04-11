import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuard,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Role } from '../decorator/role.decorator';
import {
  FindUserDTO,
  FindUsersDTO,
  UpdateUserDTO,
  UserRegisterDTO,
} from '../dto/user';
import { UserEntity } from '../entity/user.entity';
import { WalletTypeEntity } from '../entity/wallet_type.entity';
import { AuthGuard } from '../guard/auth.guard';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';
import { get_find_users_query, randomString } from '../utils/common';
import { ChannelService } from '../service/channel.service';
import { UserChannelService } from '../service/user_channel.service';

@UseGuard(AuthGuard)
@Controller('/api/user', { middleware: [JwtPassportMiddleware] })
export class UserController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  userService: UserService;
  @Inject()
  channelService: ChannelService;
  @Inject()
  userChannelService: UserChannelService;

  @Role(['admin'])
  @Post('/find_users')
  async find_users(
    @Body(ALL) body: FindUsersDTO,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    const query = get_find_users_query(body);
    query['offset'] = offset;
    query['limit'] = limit;
    const records = await this.userService.find_users(query);
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

  @Role(['admin'])
  @Post('/add_user')
  async add_user(@Body(ALL) body: UserRegisterDTO) {
    const { username, password } = body;
    const model = new UserEntity();
    model.username = username;
    model.password = password;
    model.secret_key = randomString(20);
    const wallet_type = new WalletTypeEntity();
    wallet_type.id = 1;
    model.wallet_type = wallet_type;
    const user = await this.userService.add_user(model);
    if (user) {
      // const channels = await this.channelService.find_channels();
      // const userChannels = new Array<UserChannelEntity>();
      // for (const channel of channels) {
      //   const userChannel = new UserChannelEntity();
      //   userChannel.user = user;
      //   userChannel.channel = channel;
      //   userChannel.rate = channel.rate;
      //   userChannel.enabled = channel.enabled;
      //   userChannels.push(userChannel);
      // }
      // await this.userChannelService.save_user_channels(userChannels);
      return this.success();
    } else {
      return this.error(500, { error: 'username is already exist' });
    }
  }
}
