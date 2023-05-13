<template>
  <el-dialog title="重置密码" v-model="show" @close="closeDialog">
    <el-form
      ref="ruleFormRef"
      :model="resetForm"
      :rules="rules"
      label-width="70px"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="resetForm.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="resetForm.password"
          placeholder="请输入密码"
          @keyup.enter="confirm"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { updatePassword } from '@/api/login'
import { ref, watch, reactive } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  dialogVisible: Boolean
})

const show = ref(false)
const resetForm = reactive({
  userName: '',
  password: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

watch(
  () => props.dialogVisible,
  (val) => {
    show.value = val
    ruleFormRef.value?.resetFields()
  }
)

// 将文本内容写入系统粘贴板
const copyText = async (text: string) => {
  return await navigator.clipboard.writeText(text)
}

// 取消
const emit = defineEmits(['closeDialog'])
const closeDialog = () => {
  emit('closeDialog', false)
}

// 确认
const confirm = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      updatePassword({
        userName: resetForm.userName,
        password: resetForm.password
      }).then((res) => {
        if (res.code === 0) {
          copyText(resetForm.password)
          ElMessage({
            showClose: true,
            message: '您的密码已复制到粘贴板哦，下次可别忘记啦~',
            type: 'warning'
          })
          closeDialog()
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-input .el-input__wrapper) {
  height: 35px;
  border-radius: 18px;
  font-size: inherit;
  line-height: 35px;
}
.el-button {
  width: 100px;
  height: 32px;
  border-radius: 30px;
  line-height: 35px;
  margin: 0;
}
</style>
