<template>
  <el-scrollbar>
    <el-space>
      <el-input v-model="query.order_id" placeholder="请输入平台订单号" />
      <el-input v-model="query.out_order_id" placeholder="请输入商户订单号" />
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
          :key="item.channel.id"
          :label="item.channel.name!"
          :value="item.channel.id as number"
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
      <el-button icon="Search" type="primary" @click="find_records"
        >搜索
      </el-button>
    </el-space>
    <el-divider />
    <el-table v-loading="loading" :data="records" border stripe>
      <el-table-column type="expand">
        <template #default="props">
          <el-descriptions :column="4" border>
            <el-descriptions-item label="回调地址"
              >{{ props.row.notify_url }}
            </el-descriptions-item>
            <el-descriptions-item label="完成时间">
              <template v-if="props.row.status === 1">
                <el-tag type="warning">支付中</el-tag>
              </template>
              <template v-else>
                {{
                  useDateFormat(props.row.update_time, "YY-MM-DD HH:mm:ss")
                    .value
                }}
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column
        label="平台订单号"
        prop="order_id"
        width="240"
      ></el-table-column>
      <el-table-column label="商户订单号" prop="out_order_id"></el-table-column>
      <el-table-column
        label="通道"
        prop="user_channel.channel.name"
      ></el-table-column>
      <el-table-column label="订单金额" prop="amount"></el-table-column>
      <el-table-column label="费率" prop="rate"></el-table-column>
      <el-table-column label="结算金额" prop="settle_amount"></el-table-column>
      <el-table-column label="状态">
        <template #default="prop">
          <el-tag :type="prop.row.status === 1 ? 'warning' : 'success'"
            >{{ prop.row.status === 1 ? "支付中" : "已支付" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="生成时间">
        <template #default="prop">
          {{ useDateFormat(prop.row.create_time, "YY-MM-DD HH:mm:ss").value }}
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { find_orders } from "@/api/order";
import type { OrderModel, QueryModel, UserChannelModel } from "@/types";
import { useDateFormat } from "@vueuse/core";
import { shallowRef, ref, onMounted, onUnmounted } from "vue";
import { OrderStatus } from "@/types";
import { find_user_channels } from "@/api/user_channel";
import { removeEmpty } from "@/utils/common";
import { useStore } from "@/store";
const store = useStore();
const records = shallowRef<OrderModel[]>([]);
const channels = shallowRef<UserChannelModel[]>([]);
const loading = ref(true);
const query = ref<QueryModel>({
  order_id: undefined,
  out_order_id: undefined,
  channel_id: undefined,
  status: undefined,
  start_time: undefined,
  end_time: undefined,
});
const find_records = async () => {
  loading.value = true;
  const { data } = await find_orders(0, removeEmpty(query.value));
  records.value = data.records[0];
  loading.value = false;
};
const find_channels = async () => {
  const { data } = await find_user_channels();
  channels.value = data.records;
};
onMounted(() => {
  if (store.order_id !== "") {
    query.value.order_id = store.order_id;
  }
  find_records();
  find_channels();
});
onUnmounted(() => {
  store.order_id = "";
});
</script>
