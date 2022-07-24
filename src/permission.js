import router from './router';
import { getToken } from './utils/auth';

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  // set page title
  document.title = to.meta.title || '华为园区后台';

  // determine whether the user has logged in
  const hasToken = !!getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
    } else {
      // ...
      next();
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
    }
  }
});