<template>
  <div>
    <el-space>
      <el-button icon="Plus" type="primary" @click="create_handler">申请取款</el-button>
      <el-input v-model="query.order_id" placeholder="请输入取款订单号" />
      <el-input v-model="query.wallet_address" placeholder="请输入钱包地址" />
      <el-select v-model="query.status" clearable placeholder="订单状态">
        <el-option
          v-for="item in WithdrawStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
    <el-table :data="records" border stripe>
      <el-table-column label="取款订单号" prop="order_id" width="240" />
      <el-table-column label="取款金额" prop="amount" />
      <el-table-column label="手续费" prop="fee" />
      <el-table-column label="钱包协议" prop="wallet_type_name" />
      <el-table-column label="钱包地址" prop="wallet_address" />
      <el-table-column label="状态" prop="wallet_address">
        <template #default="prop">
          <el-tag :type="prop.row.status === 1 ? 'warning' : 'success'"
            >{{ prop.row.status === 1 ? '申请中' : '已完成' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" prop="wallet_address">
        <template #default="prop">
          {{ useDateFormat(prop.row.create_time, 'YY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :before-close="handleClose" title="申请取款">
      <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item label="账户余额">{{ user_records.amount }}</el-descriptions-item>
        <el-descriptions-item label="钱包协议"
          >{{ user_records.wallet_type!.name }}
        </el-descriptions-item>
        <el-descriptions-item label="钱包地址"
          >{{ user_records.wallet_address }}
        </el-descriptions-item>
        <el-descriptions-item label="提现金额">
          <el-input-number v-model="withdraw_money" :precision="2" placeholder="取款金额" />
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="apply_withdraw"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef, onMounted, ref, onUnmounted } from 'vue';
import { find_withdraws } from '@/api/withdraw';
import { useDateFormat } from '@vueuse/core';
import type { UserModel, WithdrawStatus, QueryModel, WithdrawModel } from '@/types';
import { find_user } from '@/api/user';
import { ElMessage } from 'element-plus';
import { removeEmpty } from '@/utils/common';
import { useStore } from '@/store';

const store = useStore();
const loading = ref(true);
const dialogVisible = ref(false);
const handleClose = () => {
  dialogVisible.value = false;
};
const user_records = ref<UserModel>({
  id: undefined,
  username: undefined,
  password: undefined,
  amount: undefined,
  login_ip: undefined,
  interface_ip: undefined,
  create_time: undefined,
  secret_key: undefined,
  wallet_address: undefined,
  wallet_type: { id: undefined, name: undefined }
});
const find_user_records = async () => {
  const { data } = await find_user();
  user_records.value = data.records;
};
const records = shallowRef<WithdrawModel[]>([]);

const query = ref<QueryModel>({
  order_id: undefined,
  wallet_address: undefined,
  status: undefined,
  start_time: undefined,
  end_time: undefined
});
const withdraw_money = ref(0);
const find_records = async () => {
  loading.value = true;
  const { data } = await find_withdraws(0, removeEmpty(query.value));
  records.value = data.records[0];
  loading.value = false;
};
const create_handler = async () => {
  dialogVisible.value = true;
  await find_user_records();
  withdraw_money.value = Number(user_records.value.amount!);
};
const apply_withdraw = async () => {
  if (withdraw_money.value > user_records.value.amount!) {
    ElMessage.error('取款金额不能大于账户余额');
    return;
  }
};
onMounted(() => {
  if (store.order_id !== '') {
    query.value.order_id = store.order_id;
  }
  find_records();
});
onUnmounted(() => {
  store.order_id = '';
});
</script>
