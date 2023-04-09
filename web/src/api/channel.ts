import request from '@/utils/request';
// login方法
export const find_channels = async () => {
  return await request.get('/channel/find_channels');
};
export const update_channel = async (data: any) => {
  return await request.post('/channel/update_channel', data);
};
