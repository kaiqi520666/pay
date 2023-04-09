import { createRouter, createWebHistory } from "vue-router";
import MasterView from "../views/master.vue";
import { getUserInfo } from "@/utils/common";
import { Global } from "@/global";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      meta: { title: "登录" },
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/merchant",
      component: MasterView,
      redirect: "/merchant/manage/stats",
      meta: { path: "merchant" },
      children: [
        {
          path: "manage",
          meta: { icon: "avatar", title: "商户管理" },
          children: [
            {
              path: "stats",
              meta: { title: "统计信息", role: "merchant" },
              component: () => import("../views/merchant/manage/stats.vue"),
            },
            {
              path: "info",
              meta: { title: "基本信息", role: "merchant" },
              component: () => import("../views/merchant/manage/info.vue"),
            },
            {
              path: "user_channel",
              meta: { title: "商户通道", role: "merchant" },
              component: () =>
                import("../views/merchant/manage/user_channel.vue"),
            },
            {
              path: "account_change",
              meta: { title: "商户账变", role: "merchant" },
              component: () =>
                import("../views/merchant/manage/account_change.vue"),
            },
          ],
        },
        {
          path: "order",
          meta: { icon: "document", title: "订单管理" },
          children: [
            {
              path: "list",
              name: "merchant_order_list",
              meta: { title: "订单列表", role: "merchant" },
              component: () => import("../views/merchant/order/list.vue"),
            },
          ],
        },
        {
          path: "withdraw",
          meta: { icon: "shop", title: "提现管理" },
          children: [
            {
              path: "list",
              name: "merchant_withdraw_list",
              meta: { title: "提现列表", role: "merchant" },
              component: () => import("../views/merchant/withdraw/list.vue"),
            },
          ],
        },
        {
          path: "api",
          meta: { icon: "switch", title: "对接管理" },
          children: [
            {
              path: "index",
              name: "merchant_api_index",
              meta: { title: "对接文档", role: "merchant" },
              component: () => import("../views/merchant/api/index.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      component: MasterView,
      redirect: "/admin/manage/stats",
      meta: { path: "admin" },
      children: [
        {
          path: "manage",
          meta: { icon: "avatar", title: "后台管理" },
          children: [
            {
              path: "stats",
              meta: { title: "统计信息", role: "admin" },
              component: () => import("../views/admin/manage/stats.vue"),
            },
            {
              path: "merchant",
              meta: { title: "商户管理", role: "admin" },
              component: () => import("../views/admin/manage/merchant.vue"),
            },
            {
              path: "channel",
              meta: { title: "通道管理", role: "admin" },
              component: () => import("../views/admin/manage/channel.vue"),
            },
            {
              path: "user_channel",
              name: "admin_user_channel",
              meta: { title: "商户通道", role: "admin" },
              component: () => import("../views/admin/manage/user_channel.vue"),
            },
          ],
        },
      ],
    },
  ],
});
const whileList = ["/login"];
router.beforeEach((to, from, next) => {
  document.title = ((to.meta.title as string) || "商户后台") + Global.WEB_TITLE;
  if (whileList.includes(to.path)) {
    next();
  } else {
    const userInfo = getUserInfo();
    if (userInfo) {
      if (to.meta.role && to.meta.role !== userInfo.role) {
        next("/login");
      } else {
        next();
      }
    } else {
      next("/login");
    }
  }
});
export default router;
