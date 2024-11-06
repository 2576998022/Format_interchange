# 数据格式转换网站

## 项目简介
这是一个专门用于数据格式转换的网站，主要功能是将用户输入的特定格式数据转换成指定的JSON格式输出。目前主要支持日语学习相关的数据转换功能。

## 功能特点
1. 数据输入：支持用户粘贴或输入原始数据
2. 数据验证：自动检查输入数据格式是否符合要求
3. 格式转换：将原始数据转换为规范的JSON格式
4. 结果展示：清晰展示转换后的数据，支持复制功能

## 技术架构

### 前端（Vue3）
- 框架：Vue3 + Vite
- UI组件库：Element Plus
- 状态管理：Pinia
- HTTP客户端：Axios
- 代码规范：ESLint + Prettier

### 后端（Node.js）
- 框架：Express.js
- 数据库ORM：Sequelize
- 参数验证：Joi
- 日志管理：Winston
- API文档：Swagger

### 数据库（MySQL）
数据表结构：
1. conversions表
   - id: bigint (主键)
   - input_data: text (输入数据)
   - output_data: text (输出数据)
   - conversion_type: varchar(50) (新增，标识转换类型)
   - created_at: datetime
   - updated_at: datetime

2. japanese_conversions表
   - id: bigint (主键)
   - conversion_id: bigint (关联到conversions表)
   - japanese: text (日语原文)
   - chinese: text (中文翻译)
   - romaji: text (罗马音)
   - created_at: datetime
   - updated_at: datetime
   - FOREIGN KEY (conversion_id) REFERENCES conversions(id)

## 开发流程

### 1. 环境搭建
1. 安装Node.js (v16+)
2. 安装MySQL (v8.0+)
3. 安装Vue CLI
4. 配置开发环境变量

### 2. 前端开发
1. 创建Vue3项目
2. 实现页面布局
3. 开发数据输入组件
4. 开发结果展示组件
5. 实现数据验证
6. 对接后端API

### 3. 后端开发
1. 搭建Express项目
2. 配置数据库连接
3. 实现数据转换逻辑
4. 开发API接口
5. 添加错误处理
6. 实现日志记录

### 4. 数据库设计
1. 创建数据库
2. 设计表结构
3. 配置索引
4. 实现数据备份方案

## API接口设计

### POST /api/convert
转换数据格式

请求参数：
```
{
    "inputData": ["原始数据数组"]
}
```

响应数据：
```
{
    "code": 200,
    "data": {
        "result": [
            {
                "japanese": "日语文本",
                "chinese": "中文翻译",
                "romaji": "罗马音"
            }
        ]
    },
    "message": "success"
}
```

## 错误处理策略

### 错误码定义
| 错误码 | 说明 | 处理建议 |
|--------|------|----------|
| 200 | 成功 | - |
| 400 | 请求参数错误 | 检查输入数据格式是否正确 |
| 429 | 请求过于频繁 | 请稍后重试 |
| 500 | 服务器内部错误 | 请联系管理员 |
| 1001 | 输入数据格式错误 | 检查输入格式是否符合要求 |
| 1002 | 数据转换失败 | 检查输入数据是否包含特殊字符 |

### API请求频率限制
- 每个IP每分钟最多30次请求
- 超过限制将返回429错误码

## 数据验证规则

### 输入数据验证
1. 基本格式验证
   - 必须是非空字符串数组
   - 每个数组元素必须符合格式："日语文本(中文翻译) 罗马音"
   - 数组长度不得超过1000条

2. 内容验证
   - 日语文本：必须包含日语字符（平假名、片假名或汉字）
   - 中文翻译：必须是中文字符
   - 罗马音：必须是英文字母和空格
   - 所有字段长度不得超过500字符

3. 特殊字符处理
   - 自动去除首尾空格
   - 自动处理全角/半角字符
   - 过滤HTML标签
   - 转义特殊字符

## 部署指南

### 环境要求
- Node.js >= 16.0.0
- MySQL >= 8.0
- NPM >= 8.0.0

### 开发环境部署
1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 安装依赖
```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

3. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env

# 修改环境变量
vim .env
```

4. 初始化数据库
```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE data_converter;

# 运行数据库迁移
npm run migrate
```

5. 启动服务
```bash
# 启动前端开发服务器
cd frontend
npm run dev

# 启动后端服务器
cd ../backend
npm run dev
```

### 生产环境部署
1. 构建前端
```bash
cd frontend
npm run build
```

2. 配置Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. 启动后端
```bash
cd backend
node app.js
```

## 安全措施
1. 数据安全
   - 使用HTTPS加密传输
   - 定期数据备份

2. 访问控制
   - API接口访问频率限制
   - IP黑名单机制

3. 代码安全
   - 输入数据验证和清洗
   - SQL注入防护
   - XSS攻击防护

## 性能优化
1. 前端优化
   - 静态资源CDN加速
   - 开启Gzip压缩

2. 后端优化
   - 数据库索引优化
   - 大数据量分页处理

## 问题排查指南
1. 常见问题及解决方案
   - 转换失败：检查输入数据格式
   - 服务无响应：检查服务器负载
   - 数据库连接失败：检查数据库配置

2. 日志查看方法
```bash
# 查看应用日志
tail -f /logs/app.log

# 查看错误日志
tail -f /logs/error.log
```

## 联系与支持
- 问题反馈：feedback@example.com
- 项目文档：https://docs.example.com