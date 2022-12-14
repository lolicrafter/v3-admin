<template>
  <div class="container">
    <div class="form-box">
      <el-form
        ref="ruleFormRef"
        :model="data.ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <div class="label-item-box">
          <el-form-item label="电影标题" prop="title">
            <el-input v-model="data.ruleForm.title" placeholder="请输入标题" />
          </el-form-item>

          <el-form-item label="电影导演" prop="director">
            <el-input
              v-model="data.ruleForm.director"
              placeholder="请输入电影导演"
            />
          </el-form-item>
          <el-form-item label="电影时长" prop="length">
            <el-input-number
              v-model="data.ruleForm.length"
              class="mx-4"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item label="电影上线年份" prop="publishYear">
            <el-date-picker
              v-model="data.ruleForm.publishYear"
              format="YYYY"
              value-format="YYYY"
              type="year"
              placeholder="请选择电影上线年份"
            />
          </el-form-item>
        </div>
        <el-form-item label="电影分类" prop="category">
          <el-checkbox-group
            v-model="data.ruleForm.category"
            size="large"
            :border="false"
          >
            <el-checkbox-button
              v-for="(item, index) in data.categoryOption"
              :key="index"
              class="check-item"
              :label="item.name"
            >
              {{ item.name }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="电影内容" prop="content">
          <MyEditor v-model:content="data.ruleForm.content" />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="handleClose">
        关闭
      </el-button>
      <el-button type="primary" @click="handelSubmit(ruleFormRef)">
        提交
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { Add, Update, Detail } from '@/api/movie'
import { tagList } from '@/api/tag'
import { List } from '@/api/category'
import MyEditor from '@/components/MyEditor.vue'

import { ElMessage, FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  title: [{ required: true, message: '请输入电影名', trigger: 'blur' }]
})
const data = reactive({
  ruleForm: {
    _id: '',
    title: '',
    director: '', // 电影导演
    publishYear: '', // 电影上映日期
    category: [], // 电影分类
    content: '', // 电影内容
    region: '', // 制片国家/地区
    actors: '', // 电影演员
    length: '' // 电影片长
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

const fetchDetail = (_id: string) => {
  Detail({ _id }).then((res) => {
    data.ruleForm = res.data
  })
}
const handelSubmit = async(formEl: FormInstance | undefined) => {
  if (!formEl) return
  // console.log('ruleFormRef结果===>', ruleFormRef)
  // console.log('ruleForm结果===>', ruleForm)
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      let API = Add
      if (data.ruleForm._id) API = Update
      API(data.ruleForm).then(() => {
        ElMessage.success('提交成功')
        setTimeout(() => {
          handleClose()
        }, 1000)
        // fetchList()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const handleClose = () => {
  Object.keys(data.ruleForm).forEach((item) => {
    data.ruleForm[item] = ''
  })
  proxy.$closePage(route.path)
}
const categoryTagList = () => {
  List().then((res) => {
    data.categoryOption = res.data
  })
  tagList().then((res) => {
    data.tagOption = res.data
  })
}
onMounted(() => {
  const _id = route.query._id
  if (_id) {
    fetchDetail(_id as string)
  } else {
    data.ruleForm.content = '<p>暂无内容</p>'
  }
  categoryTagList()
})

// fetchDetail()
</script>
<script script lang="ts">
export default {
  name: 'ArticleDetail'
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
  background-color: #fff;
  @include flex-center;
  flex-direction: column;
  .form-box {

    width: 1200px;
    .label-item-box{
      width: 400px;
    }
    .check-item {
      margin: 5px;
    }
    :deep(.el-checkbox-button__inner){
      border-left: 1px solid #dcdfe6;
      border-radius: var(--el-border-radius-base);
    }
  }

  .footer {
    @include flex-center;
  }
}
</style>
