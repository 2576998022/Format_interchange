<template>
  <el-container class="layout-container">
    <!-- 头部 -->
    <el-header class="header">
      <h1>数据格式转换工具</h1>
    </el-header>
    
    <!-- 主体内容 -->
    <el-main class="main-content">
      <el-row :gutter="20">
        <!-- 左侧输入区域 -->
        <el-col :span="12">
          <el-card class="input-card">
            <template #header>
              <div class="card-header">
                <span>输入数据</span>
                <el-button type="primary" size="small" @click="clearInput">
                  清空
                </el-button>
              </div>
            </template>
            <el-form :model="formData" label-position="top">
              <el-form-item label="请输入要转换的数据（每行一条）：">
                <el-input
                  v-model="formData.inputText"
                  type="textarea"
                  :rows="15"
                  placeholder="示例格式：
こんにちは(你好) konnichiwa
ありがとう(谢谢) arigatou"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleConvert">
                  转换
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>

        <!-- 右侧输出区域 -->
        <el-col :span="12">
          <el-card class="output-card">
            <template #header>
              <div class="card-header">
                <span>转换结果</span>
                <el-button type="primary" size="small" @click="copyOutput">
                  复制结果
                </el-button>
              </div>
            </template>
            <div class="json-output">
              <pre>{{ formattedOutput }}</pre>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- 底部 -->
    <el-footer class="footer">
      <p>© 2024 数据格式转换工具</p>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 表单数据
const formData = ref({
  inputText: ''
})

// 输出结果
const outputData = ref([])

// 格式化输出
const formattedOutput = computed(() => {
  return JSON.stringify(outputData.value, null, 2)
})

// 清空输入
const clearInput = () => {
  formData.value.inputText = ''
  outputData.value = []
}

// 复制输出结果
const copyOutput = async () => {
  try {
    await navigator.clipboard.writeText(formattedOutput.value)
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败')
  }
}

// 处理转换
const handleConvert = () => {
  if (!formData.value.inputText.trim()) {
    ElMessage.warning('请输入要转换的数据')
    return
  }

  try {
    // 将输入文本按行分割
    const lines = formData.value.inputText.split('\n').filter(line => line.trim())
    
    // 转换数据
    const result = lines.map(line => {
      // 使用正则表达式匹配：日语文本(中文翻译) 罗马音
      const match = line.match(/^(.+?)\((.+?)\)\s+(.+)$/)
      if (!match) {
        throw new Error(`格式错误: ${line}`)
      }

      return {
        japanese: match[1].trim(),
        chinese: match[2].trim(),
        romaji: match[3].trim()
      }
    })

    outputData.value = result
    ElMessage.success('转换成功')
  } catch (err) {
    ElMessage.error(err.message || '转换失败，请检查输入格式')
  }
}
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.header {
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-content {
  padding: 20px;
  background-color: #f5f7fa;
}

.input-card,
.output-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.json-output {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  min-height: 400px;
}

.json-output pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.footer {
  text-align: center;
  background-color: #f5f7fa;
  color: #909399;
  padding: 20px 0;
}
</style> 