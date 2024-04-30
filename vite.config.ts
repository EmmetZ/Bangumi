import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
  },
  // server: {
  //   proxy: {
  //     '/oauth': {
  //       target: 'https://bangumi-me.vercel.app',
  //       changeOrigin: true, // 必须设置为 true，以便代理服务器发送请求的来源似乎是目标域
  //       // rewrite: path => path.replace(/^\/oauth/, '/oauth')  // 确保重写规则正确
  //     }
  //   }
  // }
})