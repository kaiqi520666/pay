export type UserModel = {
  id?: number;
  username?: string;
  password?: string;
  role?: string;
  amount?: number;
  login_ip?: string;
  interface_ip?: string;
  create_time?: string;
  secret_key?: string;
  wallet_address?: string;
  enabled?: boolean;
  wallet_type?: WalletTypeModel;
};
export type UpdateUserModel = {
  id?: number;
  password?: string;
  login_ip?: string;
  interface_ip?: string;
  enabled?: boolean;
  secret_key?: string;
  wallet_address?: string;
  wallet_type_id?: number;
};
export type UserChannelModel = {
  id?: number;
  rate: number;
  enabled: boolean;
  user: UserModel;
  channel: ChannelModel;
};
export type ChannelModel = {
  id?: number;
  name?: string;
  rate?: number;
  enabled?: boolean;
};
export type OrderModel = {
  id?: number;
  order_id?: string;
  out_order_id?: string;
  amount?: number;
  rate?: number;
  user: UserModel;
  user_channel: UserChannelModel;
  create_time?: string;
  update_time?: string;
  status?: number;
  notify_url?: string;
  settle_amount?: number;
};
export type AccountChangeModel = {
  id?: number;
  amount?: number;
  after?: number;
  before?: number;
  user: UserModel;
  order?: OrderModel;
  withdraw?: WithdrawModel;
  create_time?: string;
  update_time?: string;
  account_category?: AccountCategoryModel;
};
export type AccountCategoryModel = {
  id?: number;
  name?: string;
  operate?: number;
};
export const OrderStatus = [
  { label: "支付中", value: 1 },
  { label: "已支付", value: 2 },
];
export const WithdrawStatus = [
  { label: "申请中", value: 1 },
  { label: "已完成", value: 2 },
];
export type WalletTypeModel = {
  id?: number;
  name?: string;
};
export type WithdrawModel = {
  id?: number;
  amount?: number;
  order_id?: string;
  user: UserModel;
  fee?: number;
  wallet_address?: string;
  wallet_type_name?: string;
  create_time?: string;
  update_time?: string;
  status?: number;
};

export interface QueryModel {
  [key: string]: string | number | undefined;
}
