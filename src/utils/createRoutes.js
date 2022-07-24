import Layout from '../layout/Layout.vue';

export default function createRoutes(data){
  const children = [];
  const redirect = data[0].children[0].path;
  const result = {
    children,
    redirect,
    path: '/',
    component: Layout,
  };
  data.forEach(item => {
    generateRoutes(children, item);
  });

  return [result];
}

function generateRoutes(children, item){
  if (item.path) {
    const route = {
      path: item.path,
      name: item.name,
      component: () => import(`@/views/${item.name}.vue`),
      meta: {
        title: item.name,
        icon: item.icon
      },
    };
    children.push(route);
  }

  if (item.children && item.children.length > 0) {
    item.children.forEach(e => generateRoutes(children, e));
  }
}