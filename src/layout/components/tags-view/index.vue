<template>
  <div class="tags-view-container">
    <ScrollPane class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="state.isActive(tag) ? 'active' : ''"
        :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        tag="span"
        class="tags-view-item"
        @click.middle="!state.isAffix(tag) ? state.closeSelectedTag(tag) : ''"
        @contextmenu.prevent="state.openMenu(tag, $event)"
      >
        {{ tag.query?.title||tag.meta?.title }}
        <el-icon
          v-if="!state.isAffix(tag)"
          :size="12"
          @click.prevent.stop="state.closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul
      v-show="state.visible"
      :style="{left: state.left + 'px', top: state.top + 'px'}"
      class="contextmenu"
    >
      <li @click="state.refreshSelectedTag(state.selectedTag)">
        刷新
      </li>
      <li
        v-if="!state.isAffix(state.selectedTag)"
        @click="state.closeSelectedTag(state.selectedTag)"
      >
        关闭
      </li>
      <li @click="state.closeOthersTags">
        关闭其它
      </li>
      <li @click="state.closeAllTags(state.selectedTag)">
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import path from 'path'
import { store } from '@/store'
import { ITagView } from '@/store/modules/tags-view'
import { computed, getCurrentInstance, nextTick, onBeforeMount, reactive, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import ScrollPane from './scroll-pane.vue'
import { Close } from '@element-plus/icons-vue'

const router = useRouter()
const instance = getCurrentInstance()
const currentRoute = useRoute()
const { proxy } = instance as any

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath).catch((err) => {
      console.warn(err)
    })
  } else {
    // 如果没有 tags-view，请默认重定向到主页，如果你需要，可以自行调整它
    if (view.name === 'Dashboard') {
      // 重新加载主页
      router.push({ path: '/redirect' + view.fullPath }).catch((err) => {
        console.warn(err)
      })
    } else {
      router.push('/').catch((err) => {
        console.warn(err)
      })
    }
  }
}

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {} as ITagView,
  affixTags: [] as ITagView[],
  isActive: (route: ITagView) => {
    return route.path === currentRoute.path
  },
  isAffix: (tag: ITagView) => {
    return tag.meta && tag.meta.affix
  },
  refreshSelectedTag: (view: ITagView) => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({ path: '/redirect' + fullPath }).catch((err) => {
        console.warn(err)
      })
    })
  },
  closeSelectedTag: (view: ITagView) => {
    store.commit('tagsView/DEL_VISITED_VIEW', view)
    if (state.isActive(view)) {
      toLastView(store.state.tagsView.visitedViews, view)
    }
  },
  closeOthersTags: () => {
    if (
      state.selectedTag.fullPath !== currentRoute.path &&
      state.selectedTag.fullPath !== undefined
    ) {
      router.push(state.selectedTag.fullPath).catch((err) => {
        console.warn(err)
      })
    }
    store.commit(
      'tagsView/DEL_OTHERS_VISITED_VIEWS',
      state.selectedTag as ITagView
    )
  },
  closeAllTags: (view: ITagView) => {
    store.commit('tagsView/DEL_ALL_VISITED_VIEWS')
    if (state.affixTags.some((tag) => tag.path === currentRoute.path)) {
      return
    }
    toLastView(store.state.tagsView.visitedViews, view)
  },
  openMenu: (tag: ITagView, e: MouseEvent) => {
    const menuMinWidth = 105
    const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = proxy.$el.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft) {
      state.left = maxLeft
    } else {
      state.left = left
    }
    state.top = e.clientY
    state.visible = true
    state.selectedTag = tag
  },
  closeMenu: () => {
    state.visible = false
  }
})

const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})
const routes = computed(() => store.state.permission.routes)

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: ITagView[] = []

  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })
  return tags
}

const initTags = () => {
  state.affixTags = filterAffixTags(routes.value)
  for (const tag of state.affixTags) {
    // 必须含有 name 属性
    if (tag.name) {
      store.commit(
        'tagsView/ADD_VISITED_VIEW',
        tag as ITagView
      )
    }
  }
}

const addTags = () => {
  if (currentRoute.name) {
    store.commit('tagsView/ADD_VISITED_VIEW', currentRoute)
  }
  return false
}

const moveToCurrentTag = () => {
  const tags = instance?.refs.tag as any[]
  if (tags === null || tags === undefined || !Array.isArray(tags)) {
    return
  }
  for (const tag of tags) {
    if ((tag.to as ITagView).path === currentRoute.path) {
      // When query is different then update
      if ((tag.to as ITagView).fullPath !== currentRoute.fullPath) {
        store.commit(
          'tags-view/UPDATE_VISITED_VIEW',
          currentRoute
        )
      }
    }
  }
}

watch(
  () => currentRoute.name,
  () => {
    addTags()
    moveToCurrentTag()
  }
)

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', state.closeMenu)
    } else {
      document.body.removeEventListener('click', state.closeMenu)
    }
  }
)

// life cricle
onBeforeMount(() => {
  initTags()
  addTags()
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 #00000010, 0 0 3px 0 #00000010;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #409EFF;
        color: #fff;
        border-color: #409EFF;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon {
        margin: 0 2px;
        vertical-align: middle;
        border-radius: 50%;
        &:hover {
          background-color: #00000030;
          color: #fff;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 #00000030;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
