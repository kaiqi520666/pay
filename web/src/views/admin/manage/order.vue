<template>
  <el-scrollbar>
    <el-space>
      <el-input v-model="query.order_id" placeholder="请输入平台订单号" />
      <el-input v-model="query.out_order_id" placeholder="请输入商户订单号" />
      <el-input v-model="query.user_id" placeholder="请输入商户号" />
      <el-select v-model="query.status" clearable placeholder="订单状态">
        <el-option
          v-for="item in OrderStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="query.channel_id" clearable placeholder="通道">
        <el-option
          v-for="item in channels"
          :key="item.id"
          :label="item.name"
          :value="item.id as number"
        />
      </el-select>
      <el-date-picker
        v-model="query.start_time"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="开始时间"
        type="datetime"
      />
      <el-date-picker
        v-model="query.end_time"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="结束时间"
        type="datetime"
      />
      <el-button icon="Search" type="primary" @click="find_records">搜索</el-button>
    </el-space>
    <el-divider />
    <el-table v-loading="loading" :data="records" border stripe>
      <el-table-column label="平台订单号" prop="order_id" width="240"></el-table-column>
      <el-table-column label="商户订单号" prop="out_order_id" width="240"></el-table-column>
      <el-table-column label="商户号" prop="user.id"></el-table-column>
      <el-table-column label="商户名" prop="user.username"></el-table-column>
      <el-table-column label="通道" prop="channel.name"></el-table-column>
      <el-table-column label="订单金额" prop="amount"></el-table-column>
      <el-table-column label="费率" prop="rate"></el-table-column>
      <el-table-column label="结算金额" prop="settle_amount"></el-table-column>
      <el-table-column label="状态">
        <template #default="prop">
          <el-tag :type="prop.row.status === 1 ? 'warning' : 'success'"
            >{{ prop.row.status === 1 ? '支付中' : '已支付' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="生成时间">
        <template #default="prop">
          {{ useDateFormat(prop.row.create_time, 'YY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      style="margin-top: 10px"
      @current-change="page_change"
      :total="Pager.count"
      :page-size="Pager.size"
    />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { find_orders } from '@/api/order';
import type { OrderModel, QueryModel, UserChannelModel } from '@/types';
import { removeEmpty } from '@/utils/common';
import { useDateFormat } from '@vueuse/core';
import { OrderStatus } from '@/types';
import { find_channels } from '@/api/channel';
import { useStore } from '@/store';
import { Pager } from '@/types/pager';

const store = useStore();
const records = ref<OrderModel[]>([]);
const loading = ref<boolean>(false);
const channels = shallowRef<UserChannelModel[]>([]);
const query = ref<QueryModel>({
  order_id: undefined,
  user_id: store.user_id,
  out_order_id: undefined,
  channel_id: undefined,
  status: undefined,
  start_time: undefined,
  end_time: undefined
});

const page_change = async (page: number) => {
  Pager.value.page = page;
  await find_records();
};
const find_records = async () => {
  loading.value = true;
  const { data } = await find_orders(Pager.value.page - 1, removeEmpty(query.value));
  records.value = data.records[0];
  Pager.value.count = data.records[1];
  loading.value = false;
};

const find_channel = async () => {
  const { data } = await find_channels();
  channels.value = data.records;
};
onMounted(async () => {
  await find_records();
  await find_channel();
});
onBeforeUnmount(() => {
  store.user_id = '';
});
</script>
