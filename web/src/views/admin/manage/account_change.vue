<template>
  <el-scrollbar>
    <el-space>
      <el-input v-model="query.order_id" placeholder="请输入平台订单号" />
      <el-input v-model="query.withdraw_id" placeholder="请输入取款订单号" />
      <el-input v-model="query.user_id" placeholder="请输入商户号" />
      <el-select v-model="query.account_category_id" clearable placeholder="类型">
        <el-option
          v-for="item in account_categories"
          :key="item.id"
          :label="item.name!"
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
      <el-table-column label="关联订单号">
        <template #default="props">
          <template v-if="props.row.account_category.id === 1">
            <el-button
              type="primary"
              link
              @click="clickHandler(props.row.order.order_id, 'merchant_order_list')"
            >
              {{ props.row.order.order_id }}
            </el-button>
          </template>
          <template v-else-if="props.row.account_category.id === 2">
            <el-button
              type="primary"
              link
              @click="clickHandler(props.row.pay.order_id, 'merchant_withdraw_list')"
            >
              {{ props.row.pay.order_id }}
            </el-button>
          </template>
          <template v-else>
            <el-button
              type="primary"
              link
              @click="clickHandler(props.row.withdraw.order_id, 'merchant_withdraw_list')"
            >
              {{ props.row.withdraw.order_id }}
            </el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="账变类型" prop="account_category.name"></el-table-column>
      <el-table-column label="之前金额" prop="before"></el-table-column>
      <el-table-column label="账变金额">
        <template #default="props">
          <template v-if="props.row.account_category.operate === 1">
            <el-tag type="success">+{{ props.row.amount }}</el-tag>
          </template>
          <template v-else>
            <el-tag type="danger">-{{ props.row.amount }}</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="之后金额" prop="after"></el-table-column>
      <el-table-column label="生成时间">
        <template #default="props">
          {{ useDateFormat(props.row.create_time, 'YY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { find_account_changes } from '@/api/account_change';
import type { AccountCategoryModel, AccountChangeModel, QueryModel } from '@/types';
import { removeEmpty } from '@/utils/common';
import { useDateFormat } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { find_account_categories } from '@/api/account_category';

const store = useStore();
const loading = ref(false);
const records = shallowRef<AccountChangeModel[]>([]);
const account_categories = shallowRef<AccountCategoryModel[]>([]);
const query = ref<QueryModel>({
  user_id: store.user_id,
  order_id: undefined,
  account_category_id: undefined,
  start_time: undefined,
  end_time: undefined
});
const find_records = async () => {
  loading.value = true;
  const { data } = await find_account_changes(0, removeEmpty(query.value));
  records.value = data.records[0];
  loading.value = false;
};
const find_account_category = async () => {
  const { data } = await find_account_categories();
  account_categories.value = data.records;
};
onMounted(async () => {
  if (store.user_id != '') {
    await find_records();
  }
  await find_account_category();
});
const clickHandler = (id: string, path: string) => {
  const router = useRouter();
  router.push({ path, query: { id } });
};
onBeforeUnmount(() => {
  store.user_id = '';
});
</script>
