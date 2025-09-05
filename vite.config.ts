/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'
// import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    markdown({
      // 添加 raw 模式配置
      mode: [Mode.MARKDOWN, Mode.REACT]
    }),
    VitePWA({
      // 自动更新 Service Worker，用户刷新页面时自动获取最新版本
      registerType: 'autoUpdate',
      workbox: {
        // 缓存文件类型：包含 js,css,html,图标,svg 和 markdown 文件
        // markdown 文件用于离线访问隐私政策和服务条款页面
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      // 额外包含的静态资源文件，这些文件会被预缓存
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'masked-icon.svg'],
      // 注意：不需要在此处配置 manifest，因为已存在 public/manifest.json
      // Vite 会自动使用 public/manifest.json 文件
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})