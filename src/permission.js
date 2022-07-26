import router from './router';
import { getToken } from './utils/auth';
import { useAppStore } from './stores';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const whiteList = ['/login']; // no redirect whitelist

NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = to.meta.title || '华为园区后台';

  // determine whether the user has logged in
  const hasToken = !!getToken();
  const appStore = useAppStore();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
    } else if (appStore.menus.length) {
      next();
    } else {
      await appStore.getMenus();
      next({ ...to, replace: true });
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

router.afterEach(() => {
  NProgress.done();
});
