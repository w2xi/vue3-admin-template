import request from '../utils/request';

const userApi = {
  login(data) {
    return request({
      data,
      url: '/api/user/login',
      method: 'POST'
    });
  },

  logout(data) {
    return request({
      data,
      url: '/api/user/logout',
      method: 'POST',
    });
  }
};

export default userApi;