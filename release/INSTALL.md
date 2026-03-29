# 安装与部署指南

## 环境要求

- Node.js 18.0 或更高版本
- npm 9.0 或更高版本

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看效果

### 3. 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录

### 4. 预览生产版本

```bash
npm run preview
```

## 部署方式

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

### 静态服务器

1. 执行 `npm run build`
2. 将 `dist/` 目录部署到任意静态服务器

### Node.js 服务器

```bash
node server.js
```

## 登录账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 系统管理员 | admin | admin123 |
| 运维人员 | operator | operator123 |
| 工程师 | engineer01 | engineer123 |
| 访客 | viewer | viewer123 |

## 技术支持

如有问题，请联系卖家获取技术支持。
