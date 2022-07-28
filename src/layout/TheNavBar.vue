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
        location.replace('/login');
      });
      break;
    case 'navToProfile':
      router.push('/user/profile');
    default:
      // ...
      break;
  }
}
</script>

<template>
  <el-header height="56px">
    <div class="breadcrumd"></div>
    <div class="account-info">
      <el-avatar :size="40">
        <img class="user-avatar" src="https://p9-passport.byteacctimg.com/img/user-avatar/ef1f2ee291b5c8607e76a854f04f748b~300x300.image" alt="user-avatar" />
      </el-avatar>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
            <el-dropdown-item command="navToProfile">个人中心</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  z-index: 1;
  .breadcrumd {
    width: 100px;
  }
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

.el-dropdown-link {
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
}
</style>
