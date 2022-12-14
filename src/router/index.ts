import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

/** 常驻路由 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'RootPage',
    // meta: { alwaysShow: true },
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: false
        }
      },
      {
        path: 'tag',
        component: () => import('@/views/tag/index_ts.vue'),
        name: 'Tag',
        meta: { title: '标签', icon: 'dashboard', affix: false }
      },
      {
        path: 'category',
        component: () => import('@/views/category/index.vue'),
        name: 'Category',
        meta: { title: '分类', icon: 'dashboard', affix: false }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/article/index',
        component: () => import('@/views/article/index.vue'),
        name: 'Article',
        meta: { title: '小说', icon: 'dashboard', affix: false }
      },
      {
        path: '/article/detail',
        component: () => import('@/views/article/detail.vue'),
        name: 'ArticleDetail',
        meta: { title: '小说详情', icon: 'dashboard', affix: false, hidden: true }
      }
    ]
  },
  {
    path: '/novel',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/novel/index.vue'),
        name: 'Novel',
        meta: { title: '上传小说', icon: 'dashboard', affix: false }
      },
      {
        path: 'catalog',
        component: () => import('@/views/novel/catalog.vue'),
        name: 'NovelCatalog',
        meta: { title: '上传小说目录', icon: 'dashboard', affix: false, hidden: true }
      },
      {
        path: 'detail',
        component: () => import('@/views/novel/detail.vue'),
        name: 'NovelDetail',
        meta: { title: '上传小说详情', icon: 'dashboard', affix: false, hidden: true }
      }
    ]
  },
  {
    path: '/movie',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/movie/index',
        component: () => import('@/views/movie/index.vue'),
        name: 'MovieIndex',
        meta: { title: '电影', icon: 'dashboard', affix: false }
      },
      {
        path: '/movie/detail',
        component: () => import('@/views/movie/detail.vue'),
        name: 'MovieDetail',
        meta: { title: '电影详情', icon: 'dashboard', affix: false, hidden: true }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor',
    children: [
      {
        path: 'monitor',
        component: () => import(/* webpackChunkName: "monitor" */ '@/views/monitor/index.vue'),
        name: 'Monitor',
        meta: {
          title: '监控',
          icon: 'bug'
        }
      }
    ]
  }
]

/** 动态路由 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    redirect: '/permission/page',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: 'page',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'], // 或者在子导航中设置角色
          alwaysShow: true // 将始终显示根菜单
        }
      },
      {
        path: 'directive',
        component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限' // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // 必须将 'Error' 路由放在最后, Must put the 'Error' route at the end.
    component: Layout,
    name: 'Error',
    redirect: '/404',
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
        name: '401',
        meta: {
          title: '401'
        }
      },
      {
        path: '404',
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
        name: '404',
        meta: {
          title: '404'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器，不过体验不是很好
    window.location.reload()
  }
}

export default router
