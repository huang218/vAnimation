import { defineStore } from 'pinia'
import { RouterStoreTypes, Menu } from '@/types/store/route';
import { formatRoutes } from '@/utils/router/index';
import { userServerice } from "@/apis";

export const createRouter = (): RouterStoreTypes => {
  return {
    routerList: [],
  };
};


export const routerStore = defineStore("routerStore", {
  state: createRouter,
  actions: {
    getRouterList(): Promise<Menu[]> {
      return new Promise((resolve, reject) => {
        userServerice.getUserMenu()
          .then(({ data, code }: any) => {
            if (code === 200) {
              const newRoute = formatRoutes(data.list);
              this.routerList = newRoute;
              console.log(this.routerList, 'newRoute');
              
              resolve(newRoute);
            } else {
              reject(data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});