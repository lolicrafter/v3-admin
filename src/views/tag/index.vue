<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
      >
        Create
      </el-button
      >
      <el-button @click="resetForm(ruleFormRef)">
        Reset
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: ''
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ]
})

const submitForm = async(formEl: FormInstance | undefined) => {
  if (!formEl) return
  console.log('ruleFormRef结果===>', ruleFormRef)
  console.log('ruleForm结果===>', ruleForm)
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
