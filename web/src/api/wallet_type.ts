import request from '@/utils/request';
// login方法
export const find_wallet_types = async () => {
  return await request.get('/wallet_type/find_wallet_types');
};
