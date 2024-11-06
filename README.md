# Format Interchange 项目

## 项目配置
本项目使用 Vue 3 + Vite 构建，主要依赖包括：
- Vue 3.3.4
- Pinia 2.1.7
- Element Plus 2.4.2

### 开发环境配置
1. 确保已安装 Node.js
2. 在 frontend 目录下运行以下命令安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

### 项目结构
- `frontend/` - 前端项目目录

### Vite 配置
项目使用 Vite 作为构建工具，主要配置如下：

- **基础路径**: '/'
- **开发服务器**:
  - 端口: 3000
  - 自动打开浏览器: 是
- **插件**: 
  - @vitejs/plugin-vue: Vue 3 支持

配置文件位置：`frontend/vite.config.js`