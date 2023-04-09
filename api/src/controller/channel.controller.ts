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
import { UpdateChannelDTO } from '../dto/channel';

@UseGuard(AuthGuard)
@Controller('/api/channel', { middleware: [JwtPassportMiddleware] })
export class ChannelController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  channelService: ChannelService;
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
}
