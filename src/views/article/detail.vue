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
          <el-form-item label="小说标题" prop="title">
            <el-input v-model="data.ruleForm.title" placeholder="请输入标题" />
          </el-form-item>

          <el-form-item label="小说作者" prop="author">
            <el-input
              v-model="data.ruleForm.author"
              placeholder="请输入小说作者"
            />
          </el-form-item>
          <el-form-item label="小说字数(万字)" prop="word">
            <el-input-number
              v-model="data.ruleForm.word"
              class="mx-4"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item label="小说上线年份" prop="publishYear">
            <el-date-picker
              v-model="data.ruleForm.publishYear"
              format="YYYY"
              value-format="YYYY"
              type="year"
              placeholder="请选择小说上线年份"
            />
          </el-form-item>
        </div>
        <el-form-item label="小说分类" prop="category">
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
        <el-form-item label="小说标签" prop="tag">
          <el-checkbox-group v-model="data.ruleForm.tag" size="large">
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
        <el-form-item label="小说评分" prop="star">
          <el-rate
            v-model="data.ruleForm.star"
            :low-threshold="5"
            :high-threshold="7"
            show-score
            allow-half
            :max="10"
          />
        </el-form-item>
        <el-form-item label="小说状态" prop="status">
          <el-radio-group v-model="data.ruleForm.status" size="large">
            <el-radio-button label="连载中" />
            <el-radio-button label="已完结" />
            <el-radio-button label="已太监" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="小说内容" prop="content">
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
import { Add, Update, Detail } from '@/api/article'
import { tagList } from '@/api/tag'
import { List } from '@/api/category'
import MyEditor from '@/components/MyEditor.vue'

import { ElMessage, FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  title: [{ required: true, message: '请输入小说名', trigger: 'blur' }]
})
const data = reactive({
  ruleForm: {
    _id: '',
    title: '',
    author: '', // 小说作者
    publishYear: '', // 小说上线年份
    category: [], // 小说分类
    tag: [], // 小说标签
    content: '', // 小说内容
    star: 0, // 小说评分
    status: '',
    word: Number // 小说字数
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
