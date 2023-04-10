// channel.service.ts
// Path: src/service/channel.service.ts
import { Config, Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelEntity } from '../entity/channel.entity';
import { HttpService } from '@midwayjs/axios';

const md5 = require('md5');

@Provide()
export class ChannelService {
  @InjectEntityModel(ChannelEntity)
  channelModel: Repository<ChannelEntity>;

  @Inject()
  httpService: HttpService;
  @Config('channel1')
  config: {
    url: string;
    api_id: string;
    notify_url: string;
    return_url: string;
    ip: string;
    secret_key: string;
  };

  async find_channels() {
    return await this.channelModel.find();
  }

  async update_channel(channel: ChannelEntity) {
    return await this.channelModel.save(channel);
  }

  async create_channel_1(order_id: string, money: number, phone: string) {
    const url = this.config.url;
    const api_id = this.config.api_id;
    const notify_url = this.config.notify_url;
    const return_url = this.config.return_url;
    const ip = this.config.ip;
    const secret_key = this.config.secret_key;
    const str = `api_id=${api_id}&money=${money}&notify_url=${notify_url}&orderid=${order_id}&return_url=${return_url}&key=${secret_key}`;
    const sign = md5(str).toUpperCase();
    const obj = {
      orderid: order_id,
      api_id,
      notify_url,
      return_url,
      ip,
      sign,
      money,
      mbphone: phone,
    };
    const { data } = await this.httpService.post(url, obj);
    return data;
  }
}
