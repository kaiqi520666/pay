<template>
  <el-table :data="records" border stripe v-loading="loading">
    <el-table-column prop="id" label="通道号"></el-table-column>
    <el-table-column label="通道名称">
      <template #default="props">
        <el-input v-model="props.row.name" />
      </template>
    </el-table-column>
    <el-table-column label="费率">
      <template #default="props">
        <el-input v-model="props.row.rate" />
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template #default="prop">
        <el-switch v-model="prop.row.enabled" active-text="激活" inactive-text="禁用" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="prop">
        <el-button type="primary" @click="update_record(prop.row)">修改 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { find_channels, update_channel } from '@/api/channel';
import type { ChannelModel } from '@/types';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

const records = ref<ChannelModel[]>([]);
const loading = ref<boolean>(true);
const find_records = async () => {
  const { data } = await find_channels();
  records.value = data.records;
  loading.value = false;
};
const update_record = async (channel: ChannelModel) => {
  const updateChannel = {
    id: channel.id,
    name: channel.name,
    rate: channel.rate,
    enabled: channel.enabled
  };
  const { data } = await update_channel(updateChannel);
  if (data.code == 200) {
    ElMessage.success('修改成功');
  } else {
    ElMessage.error('修改失败');
  }
};
onMounted(async () => {
  await find_records();
});
</script>
