// vite.config.ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'  // Use path instead of node:url

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'esnext',
    cssCodeSplit: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vendor_vue'
            if (id.includes('ant-design-vue')) return 'vendor_antd'
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})