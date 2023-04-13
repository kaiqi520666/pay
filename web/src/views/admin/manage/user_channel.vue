<template>
  <el-scrollbar>
    <el-space>
      <el-input readonly v-model="query.user_id" placeholder="请输入商户号" />
      <el-select v-model="channel_id" clearable placeholder="通道">
        <el-option
          v-for="item in channels"
          :key="item.id"
          :label="item.name as string"
          :value="item.id as number"
        />
      </el-select>
      <el-button type="primary" icon="Plus" @click="add_channel">添加通道</el-button>
    </el-space>
    <el-divider />
    <el-table :data="records" border stripe v-loading="loading">
      <el-table-column prop="channel.id" label="通道号"></el-table-column>
      <el-table-column prop="channel.name" label="通道名称" />
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
          <el-button type="primary" @click="update_record(prop.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>
<script setup lang="ts">
import type { ChannelModel, UserChannelModel } from '@/types';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { add_user_channel, find_user_channels, update_user_channel } from '@/api/user_channel';
import { removeEmpty } from '@/utils/common';
import { ElMessage } from 'element-plus';
import { useStore } from '@/store';
import { find_not_user_channels } from '@/api/channel';

const store = useStore();

const records = ref<UserChannelModel[]>([]);
const channels = ref<ChannelModel[]>([]);
const channel_id = ref<number>();
const loading = ref<boolean>(false);
const query = ref({
  user_id: store.user_id
});
const find_channels = async () => {
  const { data } = await find_not_user_channels({ user_id: store.user_id });
  channels.value = data.records;
};
const find_records = async () => {
  if (query.value.user_id == '') {
    return;
  }
  loading.value = true;
  const { data } = await find_user_channels(removeEmpty(query.value));
  records.value = data.records;
  loading.value = false;
};
const update_record = async (user_channel: UserChannelModel) => {
  const updateUserChannel = {
    id: user_channel.id,
    rate: user_channel.rate,
    enabled: user_channel.enabled
  };
  const { data } = await update_user_channel(updateUserChannel);
  if (data.code == 200) {
    ElMessage.success('修改成功');
  } else {
    ElMessage.error('修改失败');
  }
};
const add_channel = async () => {
  if (!channel_id.value || !query.value.user_id) {
    ElMessage.error('请选择商户号和通道');
    return;
  }
  const { data } = await add_user_channel({
    user_id: query.value.user_id,
    channel_id: channel_id.value
  });
  if (data.code == 200) {
    ElMessage.success('添加成功');
    await find_records();
    await find_channels();
  }
};
onMounted(async () => {
  if (store.user_id != '') {
    await find_records();
    await find_channels();
  }
});
onBeforeUnmount(() => {
  store.user_id = '';
});
</script>
