export default {
  menu: {
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 8,
      list: [
        {
          id: 20,
          parentId: 1,
          path: "/menu",
          name: "menu",
          component: "Layout",
          redirect: "/menu/menu-1",
          isHide: false,
          meta: {
            title: "nestedRoutes",
            icon: "menu",
            isKeepAlive: true,
            isTagView: true,
            isAffix: false,
          },
          children: [
            {
              id: 201,
              parentId: 20,
              path: "/menu/menu-1",
              name: "menu-1",
              component: "ParentView",
              redirect: "/menu/menu-1/menu-1-1",
              isHide: false,
              meta: {
                title: "menu-1",
                icon: "menu",
                isKeepAlive: true,
                isTagView: true,
                isAffix: false,
              },
              children: [
                {
                  id: 2010,
                  parentId: 201,
                  path: "/menu/menu-1/menu-1-1",
                  name: "menu-1-1",
                  component: "/src/views/menu/menu-1/menu-1-1/index.vue",
                  redirect: null,
                  isHide: false,
                  meta: {
                    title: "menu-1-1",
                    icon: "menu",
                    isKeepAlive: true,
                    isTagView: true,
                    isAffix: false,
                  },
                },
                {
                  id: 2011,
                  parentId: 201,
                  path: "/menu/menu-1/menu-1-2",
                  name: "menu-1-2",
                  component: "/src/views/menu/menu-1/menu-1-2/index.vue",
                  redirect: null,
                  isHide: false,
                  meta: {
                    title: "menu-1-2",
                    icon: "menu",
                    isKeepAlive: true,
                    isTagView: true,
                    isAffix: false,
                  },
                },
              ],
            },
          ],
        },
        {
          id: 30,
          parentId: 1,
          path: "/redirect",
          name: "redirectTo",
          component: "Layout",
          isHide: true,
          redirect: "/redirect/:path(.*)",
          meta: {
            title: "redirect",
          },
          children: [
            {
              path: "/redirect/:path(.*)",
              name: "redirect",
              id: 301,
              parentID: 30,
              isHide: false,
              component: "/src/views/redirect/index.vue",
              meta: {
                title: "redirect",
              },
            },
          ],
        },
      ],
    },
    code: 200,
    message: "查询菜单成功",
    success: true,
  },
  user: {
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 2,
      list: [
        {
          id: 1,
          account: "admin",
          password: "123456",
          name: "管理员",
          email: "qize953463876@gmail.com",
          mobile: "17683708377",
          phone: "8576288",
          age: 32,
          avatar: null,
          sex: "null",
          createTime: "2021-12-27T22:55:25.000Z",
          updateTime: "2022-01-18T22:34:22.237Z",
          dept: [{ id: 1, parentId: 0, name: "XXX公司", status: 1, description: "根节点", createTime: "2022-01-17T21:28:23.620Z", updateTime: "2022-01-17T19:43:12.222Z" }],
        },
        {
          id: 4,
          account: "admin1",
          password: "1234567",
          name: "管理员",
          email: "qize953463876@gmail.com",
          mobile: "17683708377",
          phone: "8576288",
          age: 32,
          avatar: null,
          sex: "man",
          createTime: "2022-01-19T02:37:07.962Z",
          updateTime: "2022-01-19T02:37:07.962Z",
          dept: [{ id: 1, parentId: 0, name: "XXX公司", status: 1, description: "根节点", createTime: "2022-01-17T21:28:23.620Z", updateTime: "2022-01-17T19:43:12.222Z" }],
        },
      ],
    },
    code: 200,
    message: "获取用户成功",
    success: true,
  },
};
