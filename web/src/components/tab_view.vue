<template>
  <el-tabs
    v-model="activeTab"
    style="padding: 0 20px"
    type="card"
    @tab-change="tabChange"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :closable="item.path != props.path"
      :label="item.title"
      :name="item.path!"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

const router = useRouter();
const route = useRoute();
const props = defineProps({
  path: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});

const activeTab = ref(route.path);
const tabList = ref([
  {
    title: props.title,
    path: props.path,
  },
]);
const initTabList = () => {
  const data = localStorage.getItem("tabList");
  if (data) {
    tabList.value = JSON.parse(data);
  }
};
//点击标签跳转指定路由
const tabChange = (path: any) => {
  router.push(path);
  activeTab.value = path;
};

const addTab = (tab: any) => {
  const notTab =
    tabList.value.findIndex((e: { path: any }) => e.path == tab.path) == -1;
  if (notTab) {
    tabList.value.push(tab);
  }
  localStorage.setItem("tabList", JSON.stringify(tabList.value));
};
//删除tab
const removeTab = (currentTab: any) => {
  let tabs = tabList.value;
  let a = activeTab.value;
  //如果当前路径和你要删除的路径一致
  if (currentTab == a) {
    tabs.forEach((tab: { path: any }, index: number) => {
      //要删除的路径和tabList的路径匹配
      if (tab.path == currentTab) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        //如果存在，获取nextTab路径
        if (nextTab) {
          a = nextTab.path;
        }
      }
    });
  }
  //重新赋值activeTab
  activeTab.value = a;
  //过滤删除后的tabList
  tabList.value = tabList.value.filter(
    (tab: { path: any }) => tab.path != currentTab
  );
  //设置cookie
  localStorage.setItem("tabList", JSON.stringify(tabList.value));
};

onBeforeRouteUpdate((to) => {
  activeTab.value = to.path;
  addTab({
    title: to.meta.title,
    path: to.path,
  });
});
onMounted(() => {
  initTabList();
});
</script>
