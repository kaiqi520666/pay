import { Global } from "@/global";
import request from "@/utils/request";
// login方法
export const find_withdraws = async (offset: number, data: any) => {
  return await request.post(
    `/withdraw/find_withdraws?offset=${offset}&limit=${Global.LIMIT}`,
    data
  );
};
