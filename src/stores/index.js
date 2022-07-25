import { defineStore } from 'pinia';
import userApi from '../api/user';
import router, { resetRouter } from '../router';
import { setToken, setUserInfo, getUserInfo, clearStorage } from '../utils/auth';
import createRoutes from '../utils/createRoutes';

const userInfo = getUserInfo();

export const useAppStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo,
    menus: [],
  }),
  actions: {
    login(data) {
      return new Promise((resolve, reject) => {
        userApi.login(data).then(res => {
          this.userInfo = res;
          setUserInfo(res.data);
          setToken(res.data.accessToken);

          resolve();
        }).catch(err => {
          console.log(err);
          reject();
        })
      });
    },

    getMenus() {
      return new Promise((resolve, reject) => {
        userApi.menus().then(res => {
          this.menus = res.data;
          const routes = createRoutes(res.data);
          routes.forEach(route => router.addRoute(route));

          // [resolved]: 解决刷新页面 导致当前路由丢失
          const currRoutePath = router.currentRoute.value.path
          router.replace(currRoutePath);

          resolve();
        }).catch(err => {
          console.log(err);
          reject();
        })
      })
    },

    logout() {
      return new Promise((resolve, reject) => {
        userApi.logout().then(() => {
          clearStorage();
          resetRouter();
          resolve();
        }).catch(err => {
          console.log(err);
          reject();
        });
      });
    },
  },
});