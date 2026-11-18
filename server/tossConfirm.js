/* 토스페이먼츠 결제 승인 (서버에서만 실행 — 시크릿 키 사용)
   - 배포(Vercel): api/confirm.js 가 호출
   - 내 컴퓨터(npm run dev): vite.config.js 가 /api/confirm 으로 연결
   흐름: 결제창 완료 → /order/success → 여기서 금액 확인 → 토스에 승인 요청 → 결제 완료 */
import { createRequire } from 'node:module'

const products = createRequire(import.meta.url)('../src/data/products.json')

/* 장바구니 [{ id, qty }] → 서버가 직접 계산한 결제 금액 (화면에서 보낸 금액을 믿지 않기 위해) */
function calcTotal(items) {
  if (!Array.isArray(items) || items.length === 0) return null
  let total = 0
  for (const { id, qty } of items) {
    const product = products.find((p) => p.id === id)
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > 99) return null
    total += product.salePrice * qty
  }
  return total
}

/* 반환값: { status: HTTP 상태 코드, data: 화면에 돌려줄 내용 } */
export async function confirmPayment({ paymentKey, orderId, amount, items } = {}, secretKey) {
  if (!secretKey) {
    return { status: 500, data: { message: '서버에 결제 키(TOSS_SECRET_KEY)가 설정되지 않았어요.' } }
  }
  if (!paymentKey || !orderId) {
    return { status: 400, data: { message: '결제 정보가 올바르지 않아요.' } }
  }

  const total = calcTotal(items)
  if (total === null || total !== Number(amount)) {
    return { status: 400, data: { message: '결제 금액이 주문 금액과 달라요. 다시 주문해 주세요.' } }
  }

  try {
    const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount: total }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { status: res.status, data: { code: data.code, message: data.message || '결제 승인에 실패했어요.' } }
    }
    return { status: 200, data: { orderId: data.orderId, method: data.method, totalAmount: data.totalAmount } }
  } catch {
    return { status: 502, data: { message: '결제 서버와 연결하지 못했어요. 잠시 후 다시 시도해 주세요.' } }
  }
}
