<template>
  <el-scrollbar>
    <el-space>
      <el-button icon="Plus" type="primary" @click="show_add_merchant = true">添加商户</el-button>
      <el-input v-model="query.user_id" placeholder="请输入商户号" />
      <el-input v-model="query.username" placeholder="请输入商户名" />
      <el-button icon="Search" type="primary" @click="find_records">搜索</el-button>
    </el-space>
    <el-divider />
    <el-table :data="records" border stripe v-loading="loading">
      <el-table-column type="expand">
        <template #default="props">
          <el-descriptions :column="4" border style="padding: 10px">
            <el-descriptions-item label="登录IP白名单">
              <el-input v-model="props.row.login_ip" placeholder="请输入IP地址" />
            </el-descriptions-item>
            <el-descriptions-item label="接口IP白名单">
              <el-input v-model="props.row.interface_ip" placeholder="请输入IP地址" />
            </el-descriptions-item>
            <el-descriptions-item label="钱包协议">
              <el-radio-group v-model="props.row.wallet_type.id">
                <el-radio v-for="item in wallet_types" :label="item.id!">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-descriptions-item>
            <el-descriptions-item label="钱包地址">
              <el-input v-model="props.row.wallet_address" placeholder="请输入钱包地址"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="密钥">
              <el-space>
                <el-tag>{{ props.row.secret_key }}</el-tag>
                <el-button type="primary" @click="props.row.secret_key = randomString(20)"
                  >重置
                </el-button>
              </el-space>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">
              {{ useDateFormat(props.row.create_time, 'YY-MM-DD HH:mm:ss').value }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="商户号"></el-table-column>
      <el-table-column prop="username" label="商户名"></el-table-column>
      <el-table-column label="商户密码">
        <template #default="prop">
          <el-input v-model="prop.row.password" show-password placeholder="请输入密码" />
        </template>
      </el-table-column>
      <el-table-column label="账户余额">
        <template #default="prop">
          <el-tag type="success">{{ prop.row.amount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权限">
        <template #default="prop">
          <el-tag :type="prop.row.role == 'admin' ? 'danger' : 'success'"
            >{{ prop.row.role == 'admin' ? '管理员' : '商户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="prop">
          <el-switch v-model="prop.row.enabled" active-text="激活" inactive-text="禁用" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="prop">
          <el-space>
            <el-button @click="update_record(prop.row as UserModel)">修改</el-button>
            <el-button @click="user_channel(prop.row.id)">通道</el-button>
            <el-button @click="order(prop.row.id)">订单</el-button>
            <el-button>取款</el-button>
          </el-space>
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
    <el-dialog
      v-model="show_add_merchant"
      :before-close="() => (show_add_merchant = false)"
      title="添加商户"
    >
      <el-form :model="user" label-width="100px">
        <el-form-item label="商户名">
          <el-input v-model="user.username" placeholder="请输入商户名" />
        </el-form-item>
        <el-form-item label="商户密码">
          <el-input v-model="user.password" show-password placeholder="请输入商户密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show_add_merchant = false">取消</el-button>
          <el-button type="primary" @click="add_merchant"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { add_user, find_users, update_user } from '@/api/user';
import { onMounted, ref, shallowRef } from 'vue';
import type { UpdateUserModel, UserModel, WalletTypeModel, QueryModel } from '@/types';
import { useDateFormat } from '@vueuse/core';
import { find_wallet_types } from '@/api/wallet_type';
import { randomString, removeEmpty } from '@/utils/common';
import { ElMessage } from 'element-plus';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { Pager } from '@/types/pager';

const store = useStore();
const router = useRouter();
const records = shallowRef<UserModel[]>([]);
const loading = ref<boolean>(false);
const show_add_merchant = ref<boolean>(false);
const wallet_types = ref<WalletTypeModel[]>([]);

const query = ref<QueryModel>({
  user_id: undefined,
  username: undefined
});
const user = ref({
  username: '',
  password: ''
});
const page_change = async (value: number) => {
  Pager.value.page = value;
  await find_records();
};
const find_records = async () => {
  loading.value = true;
  const { data } = await find_users(Pager.value.page - 1, removeEmpty(query.value));
  records.value = data.records[0];
  Pager.value.count = data.records[1];
  loading.value = false;
};
const find_wallet_types_handler = async () => {
  const { data } = await find_wallet_types();
  wallet_types.value = data.records;
};
onMounted(async () => {
  await find_records();
  await find_wallet_types_handler();
});
const add_merchant = async () => {
  if (
    !user.value.username ||
    !user.value.password ||
    user.value.username.length < 6 ||
    user.value.password.length < 6
  ) {
    ElMessage.error('用户名或密码不能为空,且长度不能小于6位');
    return;
  }
  const { data } = await add_user(user.value);
  if (data.code == 200) {
    ElMessage.success('添加成功');
    show_add_merchant.value = false;
    user.value.username = '';
    user.value.password = '';
    await find_records();
  } else {
    ElMessage.error('添加失败');
  }
};
const update_record = async (user: UserModel) => {
  //删除username属性,转换为UpdateUserModel,
  const updateUser: UpdateUserModel = {
    id: user.id,
    password: user.password,
    enabled: user.enabled,
    login_ip: user.login_ip,
    interface_ip: user.interface_ip,
    wallet_type_id: user.wallet_type!.id,
    wallet_address: user.wallet_address,
    secret_key: user.secret_key
  };

  const { data } = await update_user(updateUser);
  if (data.code == 200) {
    ElMessage.success('修改成功');
  } else {
    ElMessage.success('修改失败');
  }
};
const user_channel = (id: string) => {
  //TODO
  store.user_id = id;
  router.push({ name: 'admin_user_channel' });
};
const order = (id: string) => {
  store.user_id = id;
  router.push({ name: 'admin_order' });
};
</script>
