import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuard,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { BaseController } from './base.controller';
import { ChannelService } from '../service/channel.service';
import { AuthGuard } from '../guard/auth.guard';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { Role } from '../decorator/role.decorator';
import { FindNotUserChannelsDTO, UpdateChannelDTO } from '../dto/channel';
import { ChannelEntity } from '../entity/channel.entity';
import { UserChannelService } from '../service/user_channel.service';

@UseGuard(AuthGuard)
@Controller('/api/channel', { middleware: [JwtPassportMiddleware] })
export class ChannelController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  channelService: ChannelService;
  @Inject()
  userChannelService: UserChannelService;

  @Role(['admin'])
  @Get('/find_channels')
  async find_channels() {
    const records = await this.channelService.find_channels();
    return this.success({ records });
  }

  @Role(['admin'])
  @Post('/update_channel')
  async update_channel(@Body(ALL) body: UpdateChannelDTO) {
    const result = await this.channelService.update_channel(body as any);
    if (result) {
      return this.success();
    } else {
      return this.error();
    }
  }

  @Role(['admin'])
  @Post('/find_not_user_channels')
  async find_not_user_channels(@Body(ALL) body: FindNotUserChannelsDTO) {
    const query = {
      str: 'user.id = :user_id',
      obj: { user_id: body.user_id },
    };
    const user_channels = await this.userChannelService.find_user_channels(
      query
    );
    const channels = await this.channelService.find_channels();
    const records = new Array<ChannelEntity>();
    for (let i = 0; i < channels.length; i++) {
      let flag = false;
      for (let j = 0; j < user_channels.length; j++) {
        if (channels[i].id === user_channels[j].channel.id) {
          flag = true;
          break;
        }
      }
      if (!flag) records.push(channels[i]);
    }
    return this.success({ records });
  }
}
