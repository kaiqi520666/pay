<template>
  <el-container style="height: 100%">
    <el-aside>
      <el-container style="border-right: solid 1px var(--el-menu-border-color)">
        <img class="logo" alt="logo" src="@/assets/W.png" />
      </el-container>
      <el-container :style="'height:' + (screenHeight - 58) + 'px'">
        <el-menu
          :collapse="isCollapse"
          :default-active="route.path"
          class="el-menu-vertical"
          router
          style="height: 100%"
        >
          <el-sub-menu v-for="item in menuList!.children as RouteRecordRaw[]" :index="item.path">
            <template #title>
              <el-icon>
                <component :is="item.meta?.icon!" />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item
              v-for="it in item.children as RouteRecordRaw[]"
              :index="'/' + role + '/' + item.path + '/' + it.path"
              >{{ it.meta.title }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-container>
    </el-aside>
    <el-container>
      <el-header>
        <el-button
          :icon="isCollapse ? 'Expand' : 'Fold'"
          circle
          type="primary"
          @click="isCollapse = !isCollapse"
        />
        <el-space>
          <el-switch
            v-model="isDark"
            active-icon="Sunny"
            inactive-icon="Moon"
            inline-prompt
            size="large"
          />
          <el-button circle icon="SwitchButton" type="primary" @click="logout" />
        </el-space>
      </el-header>
      <tab-view :path="path" :title="route.meta.title as string" />
      <el-main style="padding-top: 0">
        <!-- router-view 动画 -->
        <router-view v-slot="{ Component }">
          <transition enter-active-class="animated fadeIn">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useRouter, useRoute, RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import TabView from '@/components/tab_view.vue';
import { getUserInfo } from '@/utils/common';
import { ref } from 'vue';
import { useDark } from '@vueuse/core';

const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
const routes = router.getRoutes();
const userModel = getUserInfo();
const role = userModel?.role;
const path = `/${role}/manage/stats`;
const menuList = routes.find((item) => item.meta.path === role);
// 暗黑模式切换
const isDark = useDark();
const screenHeight = ref(document.documentElement.clientHeight);
window.onresize = () => {
  screenHeight.value = document.documentElement.clientHeight;
};
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tabList');
  router.replace('/login');
};
</script>
<style>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.el-aside {
  width: auto !important;
}

.logo {
  width: 48px;
  height: 48px;
  margin: 10px auto 0 auto;
}
</style>
