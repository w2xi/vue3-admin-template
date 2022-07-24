import { defineStore } from 'pinia';
import userApi from '../api/user';
import { setToken, setUserInfo } from '../utils/auth';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {},
  }),
  actions: {
    login(data) {
      return new Promise((resolve, reject) => {
        userApi.login(data).then(res => {
          this.userInfo = res;
          setUserInfo(res.data);
          setToken(res.data.accessToken);

          resolve();
        }).catch(() => {
          reject();
        })
      });
    }
  },
});