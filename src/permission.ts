import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { useStore } from './store'
import { UserActionTypes } from './store/modules/user/action-types'
import { PermissionActionType } from './store/modules/permission/action-types'
import { ElMessage } from 'element-plus'
import whiteList from './config/whitelist'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  const store = useStore()
  // 判断该用户是否登录
  if (useStore().state.user.token) {
    if (to.path === '/login') {
      // 如果登录，并在 login 页面，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 检查用户是否已获得其权限角色
      if (store.state.user.roles.length === 0) {
        try {
          // 注意：角色必须是一个对象数组！ 例如: ['admin'] 或 ['developer', 'editor']
          await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
          const roles = store.state.user.roles
          // 根据角色生成可访问的 routes
          store.dispatch(PermissionActionType.ACTION_SET_ROUTES, roles)
          // 动态地添加可访问的 routes
          store.state.permission.dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })
          // 确保添加路由已完成
          // 设置 replace: true, 因此导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (err) {
          // 删除 token，并重定向到登录页面
          store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
          ElMessage.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // 如果没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
