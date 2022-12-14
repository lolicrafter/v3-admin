<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action=""
    :http-request="myUpload"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">
      添加小说
    </el-button>
    <template #tip>
      <div class="el-upload__tip">
        utf-8格式txt文件.
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, UploadProps } from 'element-plus'
import { Add } from '@/api/novel'
const emit = defineEmits(['fresh'])

const fileList = ref([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  }
])
const fresh = () => {
  emit('fresh')
}
const myUpload = (uploadFiles:any) => {
  console.log('myUpload结果😀===>', uploadFiles)
  const formData = new FormData()
  formData.append('file', uploadFiles.file)
  Add(formData).then(({ data }) => {
    // fileList.value = data
    // const ctx = useContext()
    fresh()

    // ctx.emit('fresh') // fatherMethod 是想要调用父组件的一个方法
  })
}
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>
