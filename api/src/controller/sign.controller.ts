import { ALL, Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserLoginDTO } from '../dto/user';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';
import { JwtService } from '@midwayjs/jwt';
import { UserLoginService } from '../service/user_login.service';
import { UserLoginEntity } from '../entity/user_login.entity';
import { ChannelService } from '../service/channel.service';
import { UserChannelService } from '../service/user_channel.service';

@Controller('/api/sign')
export class SignController extends BaseController {
  @Inject()
  ctx: Context;
  @Inject()
  userService: UserService;
  @Inject()
  jwtService: JwtService;
  @Inject()
  userLoginService: UserLoginService;
  @Inject()
  channelService: ChannelService;
  @Inject()
  userChannelService: UserChannelService;

  @Post('/login')
  async login(@Body(ALL) body: UserLoginDTO) {
    const { username, password } = body;
    const model = new UserEntity();
    model.username = username;
    model.password = password;
    const user = await this.userService.login(model);
    if (user) {
      const userLogin = new UserLoginEntity();
      userLogin.user = user;
      userLogin.ip = this.ctx.ip;
      await this.userLoginService.saveUserLogin(userLogin);
      const token = await this.jwtService.sign({
        id: user.id,
        role: user.role,
      });
      return this.success({ token });
    } else {
      return this.error(404);
    }
  }

  // @Post('/register')
  // async register(@Body(ALL) body: UserRegisterDTO) {
  //   const { username, password } = body;
  //   const model = new UserEntity();
  //   model.username = username;
  //   model.password = password;
  //   model.secret_key = randomString(20);
  //   const wallet_type = new WalletTypeEntity();
  //   wallet_type.id = 1;
  //   model.wallet_type = wallet_type;
  //   const user = await this.userService.register(model);
  //   if (user) {
  //     const channels = await this.channelService.find_channels();
  //     const userChannels = new Array<UserChannelEntity>();
  //     for (const channel of channels) {
  //       const userChannel = new UserChannelEntity();
  //       userChannel.user = user;
  //       userChannel.channel = channel;
  //       userChannel.rate = channel.rate;
  //       userChannel.enabled = channel.enabled;
  //       userChannels.push(userChannel);
  //     }
  //     await this.userChannelService.save_user_channels(userChannels);
  //     return this.success();
  //   } else {
  //     return this.error(500, { error: 'username is already exist' });
  //   }
  // }
}
