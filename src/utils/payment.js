/* 토스페이먼츠 결제창 (카드 · 간편결제)
   - 클라이언트 키는 .env.local 의 VITE_TOSS_CLIENT_KEY (공개돼도 되는 키)
   - 키가 없으면 paymentReady = false → 장바구니는 결제 없이 바로 주문 완료(연습용)
   - 결제창이 끝나면 /order/success 로 돌아오고, 거기서 서버(/api/confirm)에 승인 요청 */
import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk'

const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY?.trim()

export const paymentReady = !!clientKey

/* 결제창에 갔다 오는 동안 주문 내용 보관 (이 탭에서만) */
const PENDING_KEY = 'headspa7-pending-order'

export function readPendingOrder() {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_KEY))
  } catch {
    return null
  }
}

export function clearPendingOrder() {
  try {
    sessionStorage.removeItem(PENDING_KEY)
  } catch {
    /* 저장이 막힌 환경 */
  }
}

/* 사용자가 결제창을 직접 닫은 경우 (오류 문구를 띄우지 않음) */
export const isPaymentCancelled = (err) => ['USER_CANCEL', 'PAY_PROCESS_CANCELED'].includes(err?.code)

/* 결제창 열기
   items: [{ id, qty }], total: 쿠폰까지 뺀 결제 금액, couponId: 적용한 쿠폰(없으면 null)
   summary: 주문 완료 화면에 보여 줄 내용, user: 로그인 회원 */
export async function requestCardPayment({ items, total, couponId = null, orderName, summary, user }) {
  const orderId = `HS7-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({ orderId, items, couponId, summary }))
  } catch {
    /* 저장이 막혀 있으면 성공 화면에서 장바구니로 대신 확인 */
  }

  const tossPayments = await loadTossPayments(clientKey)
  const payment = tossPayments.payment({ customerKey: user?.uid ?? ANONYMOUS })

  await payment.requestPayment({
    method: 'CARD', // 카드 + 간편결제(토스페이 · 삼성페이 등)를 한 화면에서 선택
    amount: { currency: 'KRW', value: total },
    orderId,
    orderName: orderName.slice(0, 100),
    successUrl: `${window.location.origin}/order/success`,
    failUrl: `${window.location.origin}/order/fail`,
    ...(user?.email && { customerEmail: user.email }),
    ...(user?.name && { customerName: user.name }),
    card: { flowMode: 'DEFAULT', useEscrow: false, useCardPoint: false, useAppCardOnly: false },
  })
}
