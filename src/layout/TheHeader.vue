<script setup>
import { ref } from 'vue';
import { useAppStore } from '../stores/index';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const userName = ref(appStore.userInfo.userName);

function handleCommand(command) {
  switch (command) {
    case 'logout':
      appStore.logout().finally(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
      break;
    default:
      // ...
      break;
  }
}
</script>

<template>
  <el-header height="56px">
    <div class="logo-wrapper">
      <img src="@/assets/logo.svg" alt="logo" width="40" height="40" />
    </div>
    <div class="account-info">
      <el-avatar :size="40">
        <img class="user-avatar" src="https://p9-passport.byteacctimg.com/img/user-avatar/ef1f2ee291b5c8607e76a854f04f748b~300x300.image" alt="user-avatar" />
      </el-avatar>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #304156;
  color: #333;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.5);
  z-index: 1;
  .account-info {
    display: flex;
    align-items: center;
    .site-name {
      margin-right: 15px;
      color: #fff;
    }
  }
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.el-avatar {
  margin-right: 10px;
}

.el-dropdown {
  color: #fff;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
