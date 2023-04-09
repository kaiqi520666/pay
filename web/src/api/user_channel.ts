import request from "@/utils/request";
// login方法
export const find_user_channels = async (data: any) => {
  return await request.post("/user_channel/find_user_channels", data);
};
export const update_user_channel = async (data: any) => {
  return await request.post("/user_channel/update_user_channel", data);
};
