import request from '@/utils/request';
// login方法
export const find_channels = async () => {
  return await request.get('/channel/find_channels');
};
export const update_channel = async (data: any) => {
  return await request.post('/channel/update_channel', data);
};
export const find_not_user_channels = async (data: any) => {
  return await request.post('/channel/find_not_user_channels', data);
};
