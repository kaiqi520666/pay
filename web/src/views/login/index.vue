<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/user";
import { ElMessage, type FormInstance } from "element-plus";
import type { UserModel } from "@/types";
import { getUserInfo } from "@/utils/common";
import { useDark } from "@vueuse/core";

const isDark = useDark();
const loginForm = reactive<UserModel>({
  username: "zhuabc4",
  password: "a123456",
});
const loginFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const loginFormRef = ref<FormInstance>();
const router = useRouter();
const loginHandler = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    const { data } = await login(loginForm);
    if (data.code === 200) {
      localStorage.setItem("token", data.token);
      ElMessage.success("登录成功");
      const userModel = getUserInfo();
      await router.replace("/" + userModel?.role);
    } else {
      ElMessage.error("登录失败");
    }
  } catch (error) {
    ElMessage.error("登录失败");
  }
};
</script>
<template>
  <div class="container">
    <img class="logo" alt="logo" src="@/assets/W.png" />
    <el-card>
      <template #header>
        <span>用户登录</span>
        <el-switch
          v-model="isDark"
          active-icon="Sunny"
          inactive-icon="Moon"
          inline-prompt
          size="large"
          style="float: right"
        />
      </template>
      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="80px"
      >
        <!-- 用户名输入框 -->
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="loginHandler(loginFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style scoped>
/* card在各种分辨率下绝对居中，在手机设备上设置上宽度94%，在电脑屏上宽度600 */
.container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}
.logo {
  width: 128px;
  height: 128px;
  margin: 10px auto;
}

/* 表单项的label宽度为80px */
.el-form-item__label {
  width: 80px;
}

/* 表单项的内容宽度为100% */
.el-form-item__content {
  width: 100%;
}

/* 表单项的内容的子元素宽度为100% */
.el-form-item__content > * {
  width: 100%;
}
</style>
