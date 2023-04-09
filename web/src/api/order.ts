import { Global } from "@/global";
import request from "@/utils/request";
// login方法
export const find_orders = async (offset: number, data: any) => {
  return await request.post(
    `/order/find_orders?offset=${offset}&limit=${Global.LIMIT}`,
    data
  );
};
export const find_24h_order_by_user_id = async () => {
  return await request.get(`/order/find_24h_order_by_user_id`);
};
