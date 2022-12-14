<template>
  <div v-if="showEdit" style="border: 1px solid #ccc">
    <Toolbar
      :editorId="editorId"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :editorId="editorId"
      :defaultConfig="editorConfig"
      :defaultHtml="props.content"
      :mode="mode"
      style="height: 500px; overflow-y: hidden;"
      @onChange="handleChange"
    />
    <!-- 注意: defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一 -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import { IToolbarConfig } from '@wangeditor/editor'

const mode = ref('simple')
const editorId = `w-e-${Math.random().toString().slice(-5)}` // 【注意】编辑器 id ，要全局唯一
// defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    'uploadVideo',
    'insertVideo',
    'uploadImage' // 排除菜单组，写菜单组 key 的值即可
  ]
}
// 创建 toolbar
const editorConfig = { placeholder: '请输入内容...' }
const props = defineProps({
  content: {
    type: String, default: '<p>暂无内容</p>'
  }
})
const emits = defineEmits(['update:content'])
const showEdit = ref(false)

const handleChange = (editor: { getHtml: () => any }) => {
  emits('update:content', editor.getHtml())
  // console.log('Editor.getAllMenuKeys()结果===>', editor.getAllMenuKeys())
}

watch(() => props.content, (newVal) => {
  // console.log('watch结果===>', newVal)
  showEdit.value = true
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = getEditor(editorId)
  if (editor == null) return

  editor.destroy()
  removeEditor(editorId)
})
</script>

<!-- 别忘了引入样式 -->
<style src="@wangeditor/editor/dist/css/style.css"></style>
