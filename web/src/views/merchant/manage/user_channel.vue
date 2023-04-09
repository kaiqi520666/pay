<template>
  <el-table :data="records" border stripe v-loading="loading">
    <el-table-column prop="channel.id" label="通道编号"></el-table-column>
    <el-table-column prop="channel.name" label="通道"></el-table-column>
    <el-table-column prop="rate" label="费率"></el-table-column>
    <el-table-column prop="enabled" label="状态">
      <template #default="prop">
        <el-tag class="ml-2" :type="prop.row.enabled ? 'success' : 'warning'">{{
          prop.row.enabled ? "开启" : "关闭"
        }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { find_user_channels } from "@/api/user_channel";
import type { UserChannelModel } from "@/types";
import { onMounted, shallowRef, ref } from "vue";
const loading = ref<boolean>(true);
const records = shallowRef<UserChannelModel[]>([]);
const find_records = async () => {
  const { data } = await find_user_channels(undefined);
  records.value = data.records;
};
onMounted(async () => {
  await find_records();
  loading.value = false;
});
</script>
