/* Vercel 서버 함수: POST /api/confirm — 토스페이먼츠 결제 승인 */
import { confirmPayment } from '../server/tossConfirm.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'POST 요청만 받아요.' })
    return
  }
  const { status, data } = await confirmPayment(req.body ?? {}, process.env.TOSS_SECRET_KEY)
  res.status(status).json(data)
}
