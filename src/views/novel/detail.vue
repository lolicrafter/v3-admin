<template>
  <div class="container">
    <h2>{{ novel.novel.title }}</h2>
    <el-divider />
    <div class="tag-box">
      <!-- <div v-html="novel.novel.content" /> -->
      <div style="white-space: pre-line;" v-html="novel.novel.content" />
    </div>
    <el-divider />

    <div class="buttons">
      <el-button type="primary" @click="switchChapter('pre')">
        上一章
      </el-button>
      <el-button type="primary" @click="switchChapter('next')">
        下一章
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { reactive, ref } from 'vue'
import { Detail } from '@/api/novel'
import { useRoute } from 'vue-router'

const novel = ref({
  novel: {
    title: '',
    content: ''
  },
  novelId: ''
})

const fetchDetail = (novelId?: String) => {
  const route = useRoute() // 第一步
  //   console.log(route.query.type) // 第二步
  if (!novelId) {
    novel.value.novelId = route.query.id as string
  } else {
    novel.value.novelId = novelId as string
  }
  const id = novel.value.novelId
  Detail({ id }).then(({ data }) => {
    novel.value.novel = data[0]
    novel.value.novel.content = novel.value.novel.content.replace(/\n/g, '\n\n')
    // console.log('结果😀😀😀===>', res[0])
  })
}
const switchChapter = (mode:String) => {
  const keyArray = JSON.parse(localStorage.getItem('keyArray') || '')
  // console.log('keyArray结果😀😀😀===>', keyArray)
  if (keyArray) {
    const currentIndex = keyArray.findIndex((item:String) => {
      return item === novel.value.novelId
    })
    console.log('currentIndex结果😀😀😀===>', currentIndex)
    if (currentIndex > -1) {
      const preId = keyArray[currentIndex - 1]
      const nextId = keyArray[currentIndex + 1]
      console.log('nextId结果😀😀😀===>', nextId)
      if (mode === 'pre') {
        fetchDetail(preId)
      }
      if (mode === 'next') {
        fetchDetail(nextId)
      }
      backTop()
    }
  }
}

const backTop = () => {
  let top = document.documentElement.scrollTop// 获取点击时页面的滚动条纵坐标位置
  const timeTop = setInterval(() => {
    document.documentElement.scrollTop = top -= 50// 一次减50往上滑动
    if (top <= 0) {
      clearInterval(timeTop)
    }
  }, 5)// 定时调用函数使其更顺滑
}

// categoryTagList()
fetchDetail()
</script>
<script script lang="ts">
export default {
  name: 'NovelDetail'
}
</script>
<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  padding: 20px 40px;
  .header{
    padding: 20px 0;
  }
  .tag-box {
    display: flex;
  }
}
</style>
