<script setup>
import { ref } from 'vue';
import { Lock, User } from '@element-plus/icons-vue';
import { useUserStore } from '../stores';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();
const formRef = ref(null);
const loading = ref(false);
const form = ref({
  username: 'admin',
  password: 'admin',
});
const formRules = ref({
  username: [
    { required: true, message: 'please enter username', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'please enter password', trigger: 'blur' },
  ],
});

function submit() {
  formRef.value.validate(valid => {
    if (valid) {
      if (form.value.username === 'admin' && form.value.password === 'admin') {
        userStore.login(form.value).then(() => {
          router.push('/');
        });
      } else {
        ElMessage({
          type: 'error',
          message: '用户或密码不正确',
        })
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-form 
      ref="formRef" 
      :model="form" 
      :rules="formRules"
    >
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="Username">
          <template #prepend>
            <el-button :icon="User" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="Password">
          <template #prepend>
            <el-button :icon="Lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submit" :loading="loading">
          SIGN IN
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c3338;
}

.el-form {
  width: 22rem;
}
.el-form-item {
  :deep(.el-form-item__error) {
    font-size: 16px;
  }
}

.el-input {
  padding: 0;
}

.el-input {
  font-size: 16px;
  :deep(.el-input-group__prepend) {
    background-color: #363b41;
    box-shadow: none;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  :deep(.el-input__wrapper) {
    padding: 0;
  }
  :deep(.el-input__inner) {
    padding: 1.7rem 1rem;
    color: #eee;
    background-color: #3b4148;
  }
  :deep(.el-input__inner):focus {
    background-color: #434a52;
  }
  :deep(.el-input__inner):hover {
    background-color: #434a52;
  }
}

.login-btn {
  width: 100%;
  padding: 1.6rem 0;
  margin-top: 5px;
}
.login-btn:focus,
.login-btn:hover {
  background-color: var(--el-button-active-bg-color);
  border-color: var(--el-button-active-bg-color);;
}
</style>