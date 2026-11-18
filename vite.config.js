import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { confirmPayment } from './server/tossConfirm.js'

/* 내 컴퓨터(npm run dev)에서도 /api/confirm 이 동작하도록 연결
   (배포 사이트에서는 Vercel 이 api/confirm.js 를 실행) */
function tossConfirmDev(secretKey) {
  return {
    name: 'toss-confirm-dev',
    configureServer(server) {
      server.middlewares.use('/api/confirm', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ message: 'POST 요청만 받아요.' }))
          return
        }
        let raw = ''
        for await (const chunk of req) raw += chunk
        let body = {}
        try {
          body = JSON.parse(raw)
        } catch {
          /* 빈 요청 → confirmPayment 가 오류로 응답 */
        }
        const { status, data } = await confirmPayment(body, secretKey)
        res.statusCode = status
        res.end(JSON.stringify(data))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // .env.local 의 TOSS_SECRET_KEY (브라우저로는 안 나감)
  return {
    plugins: [react(), tossConfirmDev(env.TOSS_SECRET_KEY?.trim())],
  }
})
