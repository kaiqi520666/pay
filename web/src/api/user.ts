import type { UserModel } from "@/types";
import request from "@/utils/request";
// login方法
export const login = async (data: UserModel) => {
  return await request.post("/sign/login", data);
};
export const find_user = async () => {
  return await request.post("/user/find_user");
};
export const update_user = async (data: any) => {
  return await request.post("/user/update_user", data);
};
export const find_users = async (data: any = undefined) => {
  return await request.post("/user/find_users", data);
};
