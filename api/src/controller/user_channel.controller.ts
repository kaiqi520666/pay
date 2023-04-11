//  user_channel.controller.ts
import { ALL, Body, Controller, Inject, Post, UseGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Role } from '../decorator/role.decorator';
import {
  AddUserChannelDTO,
  FindUserChannelsDTO,
  UpdateUserChannelDTO,
} from '../dto/user_channel';
import { AuthGuard } from '../guard/auth.guard';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { UserChannelService } from '../service/user_channel.service';
import { BaseController } from './base.controller';
import { UserChannelEntity } from '../entity/user_channel.entity';
import { ChannelService } from '../service/channel.service';
import { UserEntity } from '../entity/user.entity';

@UseGuard(AuthGuard)
@Controller('/api/user_channel', { middleware: [JwtPassportMiddleware] })
export class UserChannelController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  userChannelService: UserChannelService;
  @Inject()
  channelService: ChannelService;

  @Role(['merchant', 'admin'])
  @Post('/find_user_channels')
  async find_user_channels(@Body(ALL) body: FindUserChannelsDTO) {
    const role = this.ctx.state.user.role;
    let query = {
      str: 'user.id = :user_id',
      obj: {},
    };
    if (role === 'admin') {
      if (body.user_id) query.obj = { user_id: body.user_id };
      if (body.user_name) {
        query.str = 'user.username = :user_name';
        query.obj = { user_name: body.user_name };
      }
    } else {
      query.obj = { user_id: this.ctx.state.user.id };
    }
    const user_channels = await this.userChannelService.find_user_channels(
      query
    );
    if (role === 'admin') {
      return this.success({ records: user_channels });
    } else {
      let records = new Array<UserChannelEntity>();
      const channels = await this.channelService.find_channels();
      for (let i = 0; i < channels.length; i++) {
        const user_channel = new UserChannelEntity();
        user_channel.channel = channels[i];
        user_channel.enabled = channels[i].enabled;
        user_channel.rate = channels[i].rate;
        for (let j = 0; j < user_channels.length; j++) {
          if (user_channels[j].channel.id === channels[i].id) {
            user_channel.enabled = !channels[i].enabled
              ? false
              : user_channels[j].enabled;
            user_channel.rate = user_channels[j].rate;
            user_channel.id = user_channels[j].id;
            break;
          }
        }
        records.push(user_channel);
      }
      return this.success({ records });
    }
  }

  @Role(['admin'])
  @Post('/update_user_channel')
  async update_user_channel(@Body(ALL) body: UpdateUserChannelDTO) {
    const result = await this.userChannelService.update_user_channel(
      body as UserChannelEntity
    );
    if (result) {
      return this.success();
    }
    return this.error();
  }

  @Role(['admin'])
  @Post('/add_user_channel')
  async add_user_channel(@Body(ALL) body: AddUserChannelDTO) {
    const channel = await this.channelService.find_channel_by_id(
      body.channel_id
    );
    const user = new UserEntity();
    user.id = body.user_id;
    const user_channel = new UserChannelEntity();
    user_channel.rate = channel.rate;
    user_channel.channel = channel;
    user_channel.user = user;
    user_channel.enabled = channel.enabled;
    const result = await this.userChannelService.add_user_channel(user_channel);
    if (result) {
      return this.success();
    } else {
      return this.error();
    }
  }
}
