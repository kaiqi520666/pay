<template>
  <el-scrollbar>
    <el-space>
      <el-input v-model="query.user_id" placeholder="请输入商户号" />
      <el-input v-model="query.user_name" placeholder="请输入商户名" />
      <el-button type="primary" icon="Search" @click="find_records">查询 </el-button>
    </el-space>
    <el-divider />
    <el-table :data="records" border stripe v-loading="loading">
      <el-table-column prop="id" label="编号"></el-table-column>
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
          <el-button type="primary" @click="update_record(prop.row)">修改 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>
<script setup lang="ts">
import type { QueryModel, UserChannelModel } from '@/types';
import { onMounted, onUnmounted, ref } from 'vue';
import { find_user_channels, update_user_channel } from '@/api/user_channel';
import { removeEmpty } from '@/utils/common';
import { ElMessage } from 'element-plus';
import { useStore } from '@/store';

const store = useStore();

const records = ref<UserChannelModel[]>([]);
const loading = ref<boolean>(false);
const query = ref<QueryModel>({
  user_id: store.user_id,
  user_name: ''
});
const find_records = async () => {
  if (query.value.order_id == '' && query.value.user_name == '') {
    ElMessage.error('请输入查询条件');
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
onMounted(async () => {
  if (store.user_id != '') await find_records();
});
onUnmounted(() => {
  store.user_id = '';
});
</script>
