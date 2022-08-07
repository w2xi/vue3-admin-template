import { defineStore } from "pinia";

export const useTabBarStore = defineStore({
  id: 'tabs-bar',
  state: () => ({
    visitedRoutes: [],
  }),
  actions: {
    addVisitedRoute(route) {
      const target = this.visitedRoutes.find(item => item.path === route.path);
      if (target) {
        if (target.fullPath !== route.fullPath) {
          Object.assign(target, route);
        }
      } else {
        this.visitedRoutes.push({ ...route });
      }
    },

    removeVisitedRoute(path) {
      const index = this.visitedRoutes.findIndex(item => item.path === path);

      if (index !== -1) {
        return this.visitedRoutes.splice(index, 1);
      }
    },
  },
})