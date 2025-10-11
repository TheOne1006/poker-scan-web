/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'
// import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'


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
      // workbox: {
      //   // 缓存文件类型：包含 js,css,html,图标,svg 和 markdown 文件
      //   // markdown 文件用于离线访问隐私政策和服务条款页面
      //   globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      // },
      // 关键：配置Workbox缓存策略
      workbox: {
        // 自定义缓存规则
        runtimeCaching: [
          // 1. 对API请求：只走网络，不缓存
          {
            urlPattern: /^\/api\//, // 匹配所有/api开头的请求
            handler: 'NetworkOnly', // 只使用网络请求，不缓存
            method: 'GET', // 对GET请求生效（可根据需要添加POST等）
            options: {
              // 确保不使用缓存
              cacheName: 'api-never-cache', // 缓存名称（仅作标识，实际不缓存）
              expiration: {
                maxEntries: 0, // 不存储任何条目
              },
            },
          },
          // 2. 对静态资源（JS/CSS/图片等）：正常缓存（可选配置）
          {
            urlPattern: /\.(js|css|png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst', // 优先从缓存获取，无缓存再走网络
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100, // 最多缓存100个资源
                maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存30天
              },
            },
          },
          // 3. 对HTML页面：使用NetworkFirst策略（保证最新）
          {
            urlPattern: /^\/.*$/, // 匹配所有根路径下的页面
            handler: 'NetworkFirst', // 优先走网络，网络失败再用缓存
            options: {
              cacheName: 'html-pages',
            },
          },
        ],
        // 清除旧的Service Worker缓存
        cleanupOutdatedCaches: true,
      },
      // 额外包含的静态资源文件，这些文件会被预缓存
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'masked-icon.svg'],
      // 注意：不需要在此处配置 manifest，因为已存在 public/manifest.json
      // Vite 会自动使用 public/manifest.json 文件
    }),
    // 仅在 build 时启用
    visualizer({ 
      open: false,  // 构建完成后自动打开分析页面
      gzipSize: true,  // 显示 gzip 压缩后的大小
      brotliSize: true  // 显示 brotli 压缩后的大小
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    // 确保资源路径正确
    assetsDir: 'assets', 
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
