import { FindOrdersDTO } from '../dto/order';
import { FindWithDrawsDTO } from '../dto/withdraw';
import { FindAccountChangeDTO } from '../dto/account_change';

// 生成不重复随机字符加数字，20个字符
export const randomString = (len: number) => {
  len = len || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
// 生成订单号，按照时间戳生成，m为商户ID，最后生成的订单号为m+年月日时分秒毫秒+6位随机数，共30位，补0方法在下面
export const create_order_id = (m: any) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = prefix_integer(date.getMonth() + 1, 2);
  const day = prefix_integer(date.getDate(), 2);
  const hour = prefix_integer(date.getHours(), 2);
  const minute = prefix_integer(date.getMinutes(), 2);
  const second = prefix_integer(date.getSeconds(), 2);
  const millisecond = prefix_integer(date.getMilliseconds(), 3);
  const random = prefix_integer(Math.floor(Math.random() * 1000000), 6);
  return `${m}${year}${month}${day}${hour}${minute}${second}${millisecond}${random}`;
};

//补0方法，num为数字，n为需要补0的总位数
const prefix_integer = (num, n) => {
  return (Array(n).join('0') + num).slice(-n);
};

export const get_find_orders_query = (
  role: string,
  user_id: number,
  body: FindOrdersDTO
) => {
  let arr_str = [];
  let obj = {};
  if (role === 'merchant') {
    arr_str.push('user.id = :user_id');
    obj['user_id'] = user_id;
  }
  if (body.order_id) {
    arr_str.push('order.order_id = :order_id');
    obj['order_id'] = body.order_id;
  }
  if (body.out_order_id) {
    arr_str.push('order.out_order_id = :out_order_id');
    obj['out_order_id'] = body.out_order_id;
  }
  if (body.channel_id) {
    arr_str.push('channel.id = :channel_id');
    obj['channel_id'] = body.channel_id;
  }
  if (body.status) {
    arr_str.push('order.status = :status');
    obj['status'] = body.status;
  }
  if (body.start_time) {
    arr_str.push('order.create_time >= :start_time');
    obj['start_time'] = body.start_time;
  }
  if (body.end_time) {
    arr_str.push('order.create_time <= :end_time');
    obj['end_time'] = body.end_time;
  }
  const str = arr_str.join(' and ');
  return { str, obj };
};

export const get_find_withdraws_query = (
  role: string,
  user_id: number,
  body: FindWithDrawsDTO
) => {
  let arr_str = [];
  let obj = {};
  if (role === 'merchant') {
    arr_str.push('user.id = :user_id');
    obj['user_id'] = user_id;
  }
  if (body.order_id) {
    arr_str.push('withdraw.order_id = :order_id');
    obj['order_id'] = body.order_id;
  }
  if (body.wallet_address) {
    arr_str.push('withdraw.wallet_address = :wallet_address');
    obj['wallet_address'] = body.wallet_address;
  }
  if (body.status) {
    arr_str.push('withdraw.status = :status');
    obj['status'] = body.status;
  }
  if (body.start_time) {
    arr_str.push('withdraw.create_time >= :start_time');
    obj['start_time'] = body.start_time;
  }
  if (body.end_time) {
    arr_str.push('withdraw.create_time <= :end_time');
    obj['end_time'] = body.end_time;
  }
  const str = arr_str.join(' and ');
  return { str, obj };
};

export const get_find_account_change_query = (
  role: string,
  user_id: number,
  body: FindAccountChangeDTO
) => {
  let arr_str = [];
  let obj = {};
  if (role === 'merchant') {
    arr_str.push('user.id = :user_id');
    obj['user_id'] = user_id;
  }
  if (body.account_category_id) {
    arr_str.push('account_category.id = :account_category_id');
    obj['account_category_id'] = body.account_category_id;
  }
  if (body.withdraw_id) {
    arr_str.push('withdraw.order_id = :withdraw_id');
    obj['withdraw_id'] = body.withdraw_id;
  }
  if (body.order_id) {
    arr_str.push('order.order_id = :order_id');
    obj['order_id'] = body.order_id;
  }
  if (body.start_time) {
    arr_str.push('account_change.create_time >= :start_time');
    obj['start_time'] = body.start_time;
  }
  if (body.end_time) {
    arr_str.push('account_change.create_time <= :end_time');
    obj['end_time'] = body.end_time;
  }
  const str = arr_str.join(' and ');
  return { str, obj };
};
