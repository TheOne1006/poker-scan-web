# proker-san web

这是一个用于 app 嵌入的 PWA 应用, 这里主要包含 三个页面,
基于 ionic 的 app

- 需要界面 UI 接近原生 APP UI
- 支持theme: default、dark theme
- 需要 ios，也需要 android 的样式 

## mock serve

- 启动一个 mock server 模拟 后台 api 与 返回

## 相关页面

### 隐私政策页面 `Privacy`

- 解析 markdown 文件 构建对应的 html

### 服务条款页面 `Terms`

- 解析 markdown 文件 构建对应的 html

### 智能客服聊天页面 `Support`

- 类似聊天对话，支持图片发送 提问
- 根据 api 返回 信息

## 打包 PWA 

### 前置条件

确保项目已正确配置 PWA 相关文件：

- `public/manifest.json` - PWA 应用清单
- `index.html` 中引用了 manifest 文件
- Service Worker 配置（通过 Vite 自动生成）

### 安装 PWA 插件

```bash
npm install vite-plugin-pwa --save-dev
```

### 配置 vite.config.ts

在 `vite.config.ts` 中添加 PWA 插件配置：

```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({...})
```

### 构建命令

```bash
# 开发模式
yarn dev

# 构建生产版本
yarn build

# 预览构建结果
yarn preview
```

### PWA 部署步骤

1. **构建项目**

   ```bash
   npm run build
   ```

2. **验证 PWA 功能**
   - 在 `dist` 目录中检查是否生成了 `sw.js`（Service Worker）
   - 检查 `manifest.json` 配置是否正确

3. **本地测试**

   ```bash
   npm run preview
   ```

   然后在浏览器中打开 `http://localhost:4173`

4. **PWA 功能验证**
   - 打开浏览器开发者工具
   - 切换到 Application/应用程序 标签
   - 检查 Service Worker 是否正常注册
   - 检查 Manifest 配置是否正确
   - 测试离线功能

5. **部署到服务器**
   - 将 `dist` 目录内容上传到 web 服务器
   - 确保服务器支持 HTTPS（PWA 要求）
   - 配置正确的 MIME 类型

### PWA 特性

- ✅ 离线访问支持
- ✅ 桌面/移动端安装
- ✅ 响应式设计
- ✅ 原生 App 体验
- ✅ 自动更新机制

### 图标要求

确保在 `public` 目录中包含以下图标：

- `favicon.png` (64x64)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

### 测试 PWA

1. 使用 Chrome DevTools 的 Lighthouse 审计
2. 测试离线功能
3. 测试安装提示
4. 验证在不同设备上的显示效果

