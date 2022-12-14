<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" @click="handleAdd">
        添加分类
      </el-button>
    </div>

    <div class="tag-box">
      <div v-for="(item, index) in tableData" :key="index">
        <div class="item-container">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="handle-box">
            <div class="edit" @click="handleEdit(item)">
              编辑
            </div>
            <!--  -->
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              title="是否确定删除?"
              @confirm="handleDelete(item)"
            >
              <template #reference>
                <div class="del">
                  删除
                </div>
              </template>
            </el-popconfirm>
            <!--  -->
            <!-- <div class="del" @click="handleDelete(item)">
              删除
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="data.ruleForm._id ? '编辑分类' : '新增分类'"
      width="400px"
      :before-close="handleClose"
    >
      <!--  -->
      <el-form
        ref="ruleFormRef"
        :model="data.ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名" prop="name">
          <el-input v-model="data.ruleForm.name" placeholder="请输入分类名" />
        </el-form-item>
      </el-form>
      <!--  -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="handelSubmit(ruleFormRef)"
          >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { reactive, ref } from 'vue'
import { toRaw } from '@vue/reactivity'
import { Add, Update, Del, List } from '@/api/category'
// eslint-disable-next-line
import type { FormInstance } from "element-plus";
const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  name: [{ required: true, message: '请输入分类名', trigger: 'blur' }]
})

const data = reactive({
  ruleForm: {
    _id: '',
    name: '',
    creator: ''
  }
})

const dialogVisible = ref(false)
const tableData = ref([
  {
    _id: '',
    name: '',
    creator: ''
  }
])
const fetchList = () => {
  console.log('ts执行===>')
  List().then(({ data }) => {
    tableData.value = data
  })
}
const handleAdd = () => {
  //
  dialogVisible.value = true
}
const handleEdit = (item: any) => {
  dialogVisible.value = true
  data.ruleForm = JSON.parse(JSON.stringify(toRaw(item)))
  // console.log('item结果===>', item)
  // console.log('ruleForm结果===>', ruleForm)
}
const handleDelete = (row: any) => {
  row = toRaw(row)
  const _id = row._id
  console.log('结果===>', _id)
  Del({ _id }).then(() => {
    handleClose()
    fetchList()
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
        handleClose()
        fetchList()
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
  dialogVisible.value = false
}

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
  .header {
    margin: 10px;
  }
  .tag-box {
    width: 94%;
    display: flex;
    flex-wrap: wrap;

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
          &:hover {
            cursor: pointer;
          }
        }
        .del {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
