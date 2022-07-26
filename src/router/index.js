import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layout/Layout.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
      }
    ]
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
