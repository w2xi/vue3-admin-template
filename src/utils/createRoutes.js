import Layout from '../layout/Layout.vue';

export default function createRoutes(data){
  const children = [];
  const result = {
    children,
    path: '/',
    name: 'Root',
    component: Layout,
  };
  data.forEach(item => {
    generateRoutes(children, item);
  });
  result.redirect = children[0].path;

  return [result];
}

function generateRoutes(children, item){
  const path = item.path;
  if (path) {
    const route = {
      path,
      name: item.name,
      component: () => import(`@/views/${item.name}.vue`),
      meta: {
        title: item.name,
        icon: item.icon,
        affix: path === '/dashboard',
      },
    };
    children.push(route);
  }

  if (item.children && item.children.length > 0) {
    item.children.forEach(e => generateRoutes(children, e));
  }
}