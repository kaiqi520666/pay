import request from "@/utils/request";
// login方法
export const find_account_categories = async () => {
  return await request.get(`/account_category/find_account_categories`);
};
