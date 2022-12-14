import { computed, createApp } from 'vue'
import { store } from '@/store'
import { ITagView } from '@/store/modules/tags-view'
import router from '@/router'
const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})

/** 加载插件文件 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = require['context']('.', true, /\.ts$/)
  files.keys().forEach((key: any) => {
    if (typeof files(key).default === 'function') {
      if (key !== './index.ts') files(key).default(app)
    }
  })
}

export function closePage(path:string) {
  store.commit('tagsView/DEL_VISITED_VIEW_CUSTOM', path)
  // console.log('path结果===>', path)
  /// / 调用全局挂载的方法
  // store.dispatch('tagsView/delView', $route)
  // 返回上一步路由
  router.go(-1)
}
