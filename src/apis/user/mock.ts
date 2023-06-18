export default {
  menu: {
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 8,
      list: [
        {
          id: 30,
          parentId: 1,
          path: '/',
          name: '工作台',
          component: 'Layout',
          isHide: false,
          redirect: '/dashboard',
          meta: {
            title: '工作台',
            icon: 'House',
            isKeepAlive: false,
            isTagView: true,
            isAffix: false
          },
          children: [
            {
              path: '/dashboard',
              name: '首页',
              id: 301,
              parentID: 30,
              isHide: false,
              component: '/src/views/dashboard/index.vue',
              meta: {
                title: '首页',
                icon: 'HomeFilled',
                isKeepAlive: true,
                isTagView: true,
                isAffix: false
              }
            }
          ]
        },
        {
          id: 10,
          parentId: 1,
          path: '/view',
          name: 'View',
          component: 'Layout',
          redirect: '/view/AboutView',
          isHide: false,
          meta: {
            title: 'view',
            icon: 'menu',
            isKeepAlive: false,
            isTagView: true,
            isAffix: false
          },
          children: [
            {
              id: 101,
              parentId: 10,
              path: '/view/AboutViewDetail',
              name: 'AboutViewDetail',
              component: '/src/views/AboutViewDetail.vue',
              isHide: true,
              meta: {
                title: 'View详情',
                icon: 'menu',
                isKeepAlive: true,
                isTagView: true,
                isAffix: false
              }
            },
            {
              id: 102,
              parentId: 10,
              path: '/view/AboutView',
              name: 'AboutView',
              component: '/src/views/AboutView.vue',
              isHide: false,
              meta: {
                title: 'AboutView',
                icon: 'Operation',
                isKeepAlive: true,
                isTagView: true,
                isAffix: false
              }
            },
            {
              id: 103,
              parentId: 10,
              path: '/view/Table',
              name: 'Table',
              component: '/src/views/table/index.vue',
              isHide: false,
              meta: {
                title: 'Table',
                icon: 'List',
                isKeepAlive: true,
                isTagView: true,
                isAffix: false
              }
            },
            {
              id: 104,
              parentId: 10,
              path: '/view/TableDetail',
              name: 'TableDetail',
              component: '/src/views/table/detail.vue',
              isHide: true,
              meta: {
                title: 'Table详情',
                icon: 'menu',
                isKeepAlive: true,
                isTagView: true,
                isAffix: false
              }
            }
          ]
        },
        {
          id: 20,
          parentId: 1,
          path: '/menu',
          name: 'Menu',
          component: 'Layout',
          redirect: '/menu/menu-1',
          isHide: false,
          meta: {
            title: 'nestedRoutes',
            icon: 'menu',
            isKeepAlive: false,
            isTagView: true,
            isAffix: false
          },
          children: [
            {
              id: 201,
              parentId: 20,
              path: '/menu/menu-1',
              name: 'menu-1',
              component: 'ParentView',
              redirect: '/menu/menu-1/menu-1-1',
              isHide: false,
              meta: {
                title: 'menu-1',
                icon: 'Tools',
                isKeepAlive: false,
                isTagView: true,
                isAffix: false
              },
              children: [
                {
                  id: 2010,
                  parentId: 201,
                  path: '/menu/menu-1/menu-1-1',
                  name: 'menu-1-1',
                  component: '/src/views/menu/menu-1/menu-1-1/index.vue',
                  redirect: null,
                  isHide: false,
                  meta: {
                    title: 'menu-1-1',
                    icon: 'Notebook',
                    isKeepAlive: true,
                    isTagView: true,
                    isAffix: false
                  }
                },
                {
                  id: 2011,
                  parentId: 201,
                  path: '/menu/menu-1/menu-1-2',
                  name: 'menu-1-2',
                  component: '/src/views/menu/menu-1/menu-1-2/index.vue',
                  redirect: null,
                  isHide: false,
                  meta: {
                    title: 'menu-1-2',
                    icon: 'CopyDocument',
                    isKeepAlive: true,
                    isTagView: true,
                    isAffix: false
                  }
                }
              ]
            },
            {
              id: 202,
              parentId: 20,
              path: '/menu/home',
              name: 'home',
              component: '/src/views/home/HomeView.vue',
              redirect: null,
              isHide: false,
              meta: {
                title: 'home',
                icon: 'Coffee',
                isKeepAlive: true,
                isTagView: true,
                isAffix: true
              }
            }
          ]
        },
        {
          id: 40,
          parentId: 1,
          path: '/loading',
          name: 'Loading',
          component: 'Layout',
          redirect: '/loading/load',
          isHide: false,
          meta: {
            title: 'nestedRoutes',
            icon: 'menu',
            isKeepAlive: false,
            isTagView: true,
            isAffix: false
          },
          children: [
            {
              id: 401,
              parentId: 40,
              path: '/loading/load',
              name: 'load',
              component: '/src/views/loading/index.vue',
              isHide: false,
              meta: {
                title: '加载动画',
                icon: 'Refresh',
                isKeepAlive: false,
                isTagView: true,
                isAffix: false
              }
            }
          ]
        }
      ]
    },
    code: 200,
    message: '查询菜单成功',
    success: true
  },
  user: {
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 2,
      list: [
        {
          id: 1,
          account: 'admin',
          password: '123456',
          name: '管理员',
          email: 'qize953463876@gmail.com',
          mobile: '17683708377',
          phone: '8576288',
          age: 32,
          avatar: null,
          sex: 'null',
          createTime: '2021-12-27T22:55:25.000Z',
          updateTime: '2022-01-18T22:34:22.237Z',
          dept: [
            {
              id: 1,
              parentId: 0,
              name: 'XXX公司',
              status: 1,
              description: '根节点',
              createTime: '2022-01-17T21:28:23.620Z',
              updateTime: '2022-01-17T19:43:12.222Z'
            }
          ]
        },
        {
          id: 4,
          account: 'admin1',
          password: '1234567',
          name: '管理员',
          email: 'qize953463876@gmail.com',
          mobile: '17683708377',
          phone: '8576288',
          age: 32,
          avatar: null,
          sex: 'man',
          createTime: '2022-01-19T02:37:07.962Z',
          updateTime: '2022-01-19T02:37:07.962Z',
          dept: [
            {
              id: 1,
              parentId: 0,
              name: 'XXX公司',
              status: 1,
              description: '根节点',
              createTime: '2022-01-17T21:28:23.620Z',
              updateTime: '2022-01-17T19:43:12.222Z'
            }
          ]
        }
      ]
    },
    code: 200,
    message: '获取用户成功',
    success: true
  }
}
