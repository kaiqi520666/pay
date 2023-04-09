//user_channel.service.ts
// Path: src/service/user_channel.service.ts
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserChannelEntity } from '../entity/user_channel.entity';
@Provide()
export class UserChannelService {
  @InjectEntityModel(UserChannelEntity)
  userChannelModel: Repository<UserChannelEntity>;

  async save_user_channels(userChannels: UserChannelEntity[]) {
    return await this.userChannelModel.save(userChannels);
  }
  async find_user_channels(query: any) {
    return await this.userChannelModel
      .createQueryBuilder('user_channel')
      .innerJoin('user_channel.user', 'user')
      .innerJoin('user_channel.channel', 'channel')
      .where(query.str, query.obj)
      .select([
        'user_channel.rate',
        'user_channel.enabled',
        'user_channel.id',
        'channel.id',
        'channel.name',
        'user.id',
        'user.username',
      ])
      .getMany();
  }
  async find_user_channel(user_id: number, channel_id: number) {
    return await this.userChannelModel.findOne({
      where: { user: { id: user_id }, channel: { id: channel_id } },
    });
  }
  async update_user_channel(userChannel: UserChannelEntity) {
    return await this.userChannelModel.save(userChannel);
  }
}
