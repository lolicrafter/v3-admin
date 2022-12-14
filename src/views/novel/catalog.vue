<template>
  <div class="container">
    <div class="tag-box">
      <el-table :data="tableData" border style="width: 100%;font-size:18px">
        <el-table-column prop="newKey" label="标题" />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button type="danger" size="small" @click="handleWatch(scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:currentPage="Data.searchForm.pageIndex"
          v-model:page-size="Data.searchForm.pageSize"
          background
          :page-sizes="[20, 50, 100, 200]"
          layout="sizes,prev, pager, next, jumper"
          :total="Data.total"
          @size-change="fetchList"
          @current-change="fetchList"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { reactive, ref } from 'vue'
import { toRaw } from '@vue/reactivity'
import { Del, List } from '@/api/novel'
import { List as categoryList } from '@/api/category'
import { tagList } from '@/api/tag'
import router from '@/router'
import { useRoute } from 'vue-router'

const Data = reactive({
  searchForm: {
    name: '',
    pageIndex: 1,
    pageSize: 10
  },
  total: 0
})
const tableData = ref([
  {
    id: '',
    newKey: ''
  }
])
const route = useRoute() // 第一步

const fetchList = (reset = false) => {
  if (reset === true) {
    Data.searchForm = {
      name: route.query.name as string,
      pageIndex: 1,
      pageSize: 10
    }
  }
  Data.searchForm.name = route.query.name as string
  //   console.log(route.query.type) // 第二步
  List(Data.searchForm).then(({ data }) => {
    tableData.value = data[0].catalog
    Data.total = data[0].total
  })
}
const handleAdd = (item?: { _id: any }) => {
  router.push({
    path: '/novel/detail',
    query: {
      _id: item?._id,
      title: item?._id ? '编辑小说' : '新增小说'
    }
  })
}
const handleWatch = (item:{ id: any }) => {
  const keyArray = tableData.value.map(item => {
    return item.id
  })
  localStorage.setItem('keyArray', JSON.stringify(keyArray))
  console.log('keyArray结果😀😀😀===>', keyArray)
  router.push({
    path: '/novel/detail',
    query: {
      id: item.id
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
// categoryTagList()
fetchList()
</script>
<script script lang="ts">
export default {
  name: 'NovelCatalog'
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
}
</style>
