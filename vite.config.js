import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ base를 본인의 GitHub 레포 이름으로 변경하세요
// 예: 레포 이름이 "trading-dashboard"이면 '/trading-dashboard/'
export default defineConfig({
  plugins: [react()],
  base: '/trading-dashboard/',
})
