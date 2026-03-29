import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  // 开发服务器配置
  server: {
    port: 5173,
    open: true,
    // 启用模块热替换
    hmr: {
      overlay: true
    }
  },
  // 构建配置
  build: {
    // 启用代码压缩
    minify: 'terser',
    // 生成source map
    sourcemap: false,
    // 配置 terser 选项
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 配置 Rollup 选项
    rollupOptions: {
      output: {
        // 代码分割策略
        manualChunks(id) {
          // 将echarts单独打包
          if (id.includes('echarts')) {
            return 'echarts';
          }
          // 将react相关库单独打包
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'react';
          }
          // 将工具函数单独打包
          if (id.includes('src/utils/')) {
            return 'utils';
          }
          // 将pages目录下的文件单独打包
          if (id.includes('src/pages/')) {
            return 'pages';
          }
          // 将components目录下的文件单独打包
          if (id.includes('src/components/')) {
            return 'components';
          }
        },
        // 优化输出
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
