import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const _createRouter = () => createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

const router = _createRouter();

export function resetRouter() {
  const newRouter = _createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
