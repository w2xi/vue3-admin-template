const TOKEN_KEY = 'Admin-Token';
const USER_KEY = 'User-Info';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(value) {
  localStorage.setItem(TOKEN_KEY, value);
}

function getUserInfo() {
  return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
}

function setUserInfo(value) {
  localStorage.setItem(USER_KEY, JSON.stringify(value));
}


export {
  getToken,
  setToken,
  getUserInfo,
  setUserInfo,
};