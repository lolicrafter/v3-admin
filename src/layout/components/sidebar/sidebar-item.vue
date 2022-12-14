<!-- 侧边栏 Item -->
<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="{'simple-mode': isCollapse, 'first-level': isFirstLevel}"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <template v-if="theOnlyOneChild.meta.title" #title>
            {{ theOnlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <template v-else>
      <template v-if="!alwaysShowRootMenu && childrenShowOut">
        <SidebarItemLink v-for="child in childrenShowOut" :key="child?.path" :to="resolvePath(child?.path)">
          <el-menu-item :index="resolvePath(child.path)">
            <svg-icon
              v-if="child.meta.icon"
              :name="child.meta.icon"
            />
            <template v-if="child.meta.title" #title>
              {{ child.meta.title }}
            </template>
          </el-menu-item>
        </SidebarItemLink>
      </template>
      <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
        <template #title>
          <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
          <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
        </template>
        <template v-if="item.children">
          <sidebar-item
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            :is-collapse="isCollapse"
            :is-first-level="false"
            :base-path="resolvePath(child.path)"
          />
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" setup>
import path from 'path'
import { computed, onMounted, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './sidebar-item-link.vue'

interface showOutInterface {
  child:{
    path:String
    meta:Object
  }
}

// useState<Array<showOutInterface>>()

// function useState<showOutInterface>(): [any] {
//   throw new Error('Function not implemented.')
// }

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  isCollapse: {
    type: Boolean,
    required: false
  },
  isFirstLevel: {
    type: Boolean,
    default: true
  },
  basePath: {
    type: String,
    required: true
  }
})
const alwaysShowRootMenu = computed(() => {
  return !!(props.item.meta && props.item.meta.alwaysShow)
})

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      return !(item.meta && item.meta.hidden)
    })
    return showingChildren.length
  }
  return 0
})

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }

  // console.log('props.item结果===>', props.item)
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already contains item's path information
  return { ...props.item, path: '' }
})

const childrenShowOut = computed(() => {
  if (showingChildNumber.value <= 1) {
    return null
  }
  // 把根目录下的路由提取到一级菜单
  if (props.item.path !== '/') return null
  if (props.item.children) {
    return props.item.children.filter(item => {
      return item
    })
  }
  return { ...props.item, path: '' }
})

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
onMounted(() => {
  // console.log('theOnlyOneChild结果===>', theOnlyOneChild.value)
  // console.log('childrenShowOut结果===>', childrenShowOut.value)
})
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 20px;
  min-width: 1em;
  font-size: 16px;
}

.simple-mode {
  &.first-level {
    ::v-deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
