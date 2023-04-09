import type { UserModel } from "@/types";

// 解析 jwt token 得到UserModel
export const getUserInfo = (): UserModel | undefined => {
  const token = localStorage.getItem("token");
  if (!token) return undefined;
  const base64Url = token?.split(".")[1];
  const base64 = base64Url?.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64 as string));
};

// 验证IP地址是否合法，返回真或假
export const validateIP = (value: any) => {
  if (value === "") {
    return true;
  } else
    return /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(
      value
    );
};
// 生成不重复随机字符加数字，20个字符
export const randomString = (len: number) => {
  len = len || 32;
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
//去除空值
export const removeEmpty = (obj: any) => {
  for (let i in obj) {
    if (obj[i] === "" || obj[i] === undefined || obj[i] === null) {
      delete obj[i];
    }
  }
  return obj;
};
//返回24小时,格式为00:00-23:00
export const get24Hours = () => {
  let hours = [];
  for (let i = 0; i < 24; i++) {
    let hour = i < 10 ? "0" + i : i;
    hours.push(hour + ":00");
  }
  return hours;
};

//根据orders数组返回24小时内的订单金额
export const get24HoursOrderAmount = (orders: any) => {
  let array = [];
  for (let i = 0; i < 24; i++) {
    array.push(0);
  }
  for (let i = 0; i < orders.length; i++) {
    array[parseInt(orders[i].hours)] = orders[i].amount;
  }
  return array;
};
