import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1680589307393_3165',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '5e46258384658271',
        database: 'pay',
        synchronize: true,
        dateStrings: true,
        logging: false,
        timezone: '+08:00',
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
  jwt: {
    secret: 'uWQEklsdjfio4534kl23#%$#2',
    expiresIn: '2d',
  },
  passport: {
    session: false,
  },
  channel1: {
    url: 'http://27.102.66.92:8158/WebPayApi.asmx/AddOrderTestPost',
    api_id: '6ce4beed-f1d3-4360-9ef1-7ee05cc3e2e8',
    notify_url: 'http://www.baidu.com',
    return_url: 'http://www.sina.com.cn',
    ip: '18.162.232.94',
    secret_key: 'x4ytUJsmPhbFawLH5K',
  },
} as MidwayConfig;
