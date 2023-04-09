<template>
  <div>
    <el-descriptions v-loading="loading" :column="4" border>
      <el-descriptions-item label="商户号"
        >{{ records.id }}
      </el-descriptions-item>
      <el-descriptions-item label="商户名"
        >{{ records.username }}
      </el-descriptions-item>
      <el-descriptions-item label="注册时间"
        >{{ useDateFormat(records.create_time, "YY-MM-DD HH:mm:ss").value }}
      </el-descriptions-item>
      <el-descriptions-item label="密钥">
        <el-space
          ><span>{{ records.secret_key }}</span>
          <el-button
            type="primary"
            @click="records.secret_key = randomString(20)"
            >重置
          </el-button>
        </el-space>
      </el-descriptions-item>
      <el-descriptions-item label="余额"
        >{{ records.amount }}
      </el-descriptions-item>
      <el-descriptions-item label="密码">
        <el-input
          v-model="records.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="登录IP白名单">
        <el-input v-model="records.login_ip" placeholder="请输入IP"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="接口IP白名单">
        <el-input
          v-model="records.interface_ip"
          placeholder="请输入IP"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="钱包协议">
        <el-radio-group v-model="records.wallet_type!.id">
          <el-radio v-for="item in wallet_types" :label="item.id!"
            >{{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-descriptions-item>
      <el-descriptions-item label="钱包地址">
        <el-input
          v-model="records.wallet_address"
          placeholder="请输入钱包地址"
        ></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
    <div style="display: flex; justify-content: center">
      <el-button style="width: 80%" type="primary" @click="update_handler"
        >修改
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { find_user, update_user } from "@/api/user";
import type { UserModel, WalletTypeModel } from "@/types";
import { useDateFormat } from "@vueuse/core";
import { randomString } from "@/utils/common";
import { ElMessage } from "element-plus";
import { find_wallet_types } from "@/api/wallet_type";

const loading = ref<boolean>(true);
const records = ref<UserModel>({
  id: undefined,
  username: undefined,
  password: undefined,
  amount: undefined,
  login_ip: undefined,
  interface_ip: undefined,
  create_time: undefined,
  secret_key: undefined,
  wallet_address: undefined,
  wallet_type: { id: undefined, name: undefined },
});
const find_records = async () => {
  const { data } = await find_user();
  records.value = data.records;
};
const wallet_types = ref<WalletTypeModel[]>([]);
const update_handler = async () => {
  loading.value = true;
  const value = {
    password: records.value.password,
    login_ip: records.value.login_ip,
    interface_ip: records.value.interface_ip,
    secret_key: records.value.secret_key,
    wallet_address: records.value.wallet_address,
    wallet_type_id: records.value.wallet_type!.id,
  };
  const { data } = await update_user(value);
  if (data.code === 200) {
    ElMessage.success("修改成功");
  } else {
    ElMessage.error("修改失败");
  }
  loading.value = false;
};
const find_wallet_types_handler = async () => {
  const { data } = await find_wallet_types();
  wallet_types.value = data.records;
};
onMounted(async () => {
  await find_records();
  await find_wallet_types_handler();
  loading.value = false;
});
</script>
