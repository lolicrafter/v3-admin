<template>
  <div class="container">
    <div class="search-box">
      <el-form :inline="true" :model="data.searchForm" class="demo-form-inline">
        <el-form-item label="小说名称">
          <el-input v-model="data.searchForm.title" placeholder="请输入小说名称" />
        </el-form-item>
        <el-form-item label="小说标签" prop="tag">
          <el-checkbox-group v-model="data.searchForm.tag" size="large">
            <el-checkbox-button
              v-for="(item, index) in data.tagOption"
              :key="index"
              class="check-item"
              :label="item.name"
            >
              {{ item.name }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchList">
            搜索
          </el-button>
          <el-button type="primary" @click="fetchList(reset= true)">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="header">
      <el-button type="primary" @click="handleAdd()">
        添加小说
      </el-button>
    </div>

    <div class="tag-box">
      <el-table :data="tableData" border style="width: 100%;font-size:18px">
        <el-table-column prop="title" label="标题" width="250" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="publishYear" label="上线年份" width="120" />
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="tag" label="标签" width="240" />
        <el-table-column prop="star" label="评分" width="120" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column prop="word" label="字数" width="120" />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleAdd(scope.row)"
            >
              编辑
            </el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { reactive, ref } from 'vue'
import { toRaw } from '@vue/reactivity'
import { Del, List } from '@/api/article'
import { List as categoryList } from '@/api/category'
import { tagList } from '@/api/tag'

import router from '@/router'
import axios from 'axios'

const data = reactive({
  searchForm: {
    _id: '',
    title: '',
    author: '', // 小说作者
    publishYear: '', // 小说上线年份
    category: [], // 小说分类
    tag: [], // 小说标签
    content: '', // 小说内容
    star: '', // 小说评分
    status: '',
    word: '' // 小说字数'
  },
  searchFormBackup: {
    _id: '',
    title: '',
    author: '', // 小说作者
    publishYear: '', // 小说上线年份
    category: [], // 小说分类
    tag: [], // 小说标签
    content: '', // 小说内容
    star: '', // 小说评分
    status: '',
    word: '' // 小说字数'
  },
  categoryOption: [
    {
      _id: '',
      name: ''
    }
  ],
  tagOption: [
    {
      _id: '',
      name: ''
    }
  ]
})

const tableData = ref([
  {
    _id: '',
    name: '',
    creator: ''
  }
])
const fetchList = (reset = false) => {
  if (reset === true) {
    data.searchForm = JSON.parse(JSON.stringify(data.searchFormBackup))
  }
  List(data.searchForm).then(({ data }) => {
    tableData.value = data
  })
}
const handleAdd = (item?: { _id: any }) => {
  router.push({
    path: '/article/detail',
    query: {
      _id: item?._id,
      title: item?._id ? '编辑小说' : '新增小说'
    }
  })
}
const handleDelete = (row: any) => {
  row = toRaw(row)
  const _id = row._id
  console.log('结果===>', _id)
  Del({ _id }).then(() => {
    fetchList()
  })
}

const categoryTagList = () => {
  categoryList().then((res) => {
    data.categoryOption = res.data
  })
  tagList().then((res) => {
    data.tagOption = res.data
  })
}
categoryTagList()
fetchList()
</script>
<script script lang="ts">
export default {
  name: 'TagTs'
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

    .item-container {
      width: 120px;
      height: 80px;
      padding: 2px 5px;
      background-color: #ffffff;
      margin: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 22px;
        flex: 2;
        @include flex-center;
      }
      .handle-box {
        flex: 1;
        @include flex-center;
        justify-content: flex-end;
        .del,
        .edit {
          font-size: 12px;
          &:hover{
            cursor: pointer;
          }
        }
        .del{
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
