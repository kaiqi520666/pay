//  user_channel.controller.ts
import { ALL, Body, Controller, Inject, Post, UseGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Role } from '../decorator/role.decorator';
import { FindUserChannelsDTO, UpdateUserChannelDTO } from '../dto/user_channel';
import { AuthGuard } from '../guard/auth.guard';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { UserChannelService } from '../service/user_channel.service';
import { BaseController } from './base.controller';
import { UserChannelEntity } from '../entity/user_channel.entity';

@UseGuard(AuthGuard)
@Controller('/api/user_channel', { middleware: [JwtPassportMiddleware] })
export class UserChannelController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  userChannelService: UserChannelService;

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
    const records = await this.userChannelService.find_user_channels(query);
    return this.success({ records });
  }
  @Role(['admin'])
  @Post('/update_user_channel')
  async updateUserChannel(@Body(ALL) body: UpdateUserChannelDTO) {
    const result = await this.userChannelService.update_user_channel(
      body as UserChannelEntity
    );
    if (result) {
      return this.success();
    }
    return this.error();
  }
}
