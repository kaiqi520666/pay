import { Global } from "@/global";
import request from "@/utils/request";
// login方法
export const find_account_changes = async (offset: number, data: any) => {
  return await request.post(
    `/account_change/find_account_changes?offset=${offset}&limit=${Global.LIMIT}`,
    data
  );
};
