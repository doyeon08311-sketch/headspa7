import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { clearPendingOrder, readPendingOrder } from '../utils/payment.js'
import useCart from '../cart/useCart.js'
import './ListPage.css'
import './SubPage.css'

/* 결제창에서 돌아오는 곳 (?paymentKey=…&orderId=…&amount=…)
   서버(/api/confirm)에 결제 승인을 요청하고, 성공하면 주문 완료 화면으로 */
function OrderSuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  const [error, setError] = useState(null)
  const started = useRef(false) // 승인 요청은 한 번만

  useEffect(() => {
    if (started.current) return
    started.current = true

    const orderId = params.get('orderId')
    const pending = readPendingOrder()
    const order = pending?.orderId === orderId ? pending : null

    fetch('/api/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentKey: params.get('paymentKey'),
        orderId,
        amount: Number(params.get('amount')),
        items: order?.items ?? items.map(({ id, qty }) => ({ id, qty })),
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.message || '결제 승인에 실패했어요.')
        clearPendingOrder()
        clearCart()
        const summary = order?.summary ?? { total: data.totalAmount }
        navigate('/order/complete', { replace: true, state: { ...summary, orderId: data.orderId } })
      })
      .catch((err) => setError(err.message))
  }, [params, items, navigate, clearCart])

  if (error) {
    return (
      <div className="list-page complete">
        <h1 className="t-promo">결제를 완료하지 못했어요</h1>
        <p className="complete-desc">{error}</p>
        <div className="complete-buttons">
          <Link to="/cart" className="btn btn--primary">
            장바구니로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="list-page complete">
      <h1 className="t-promo">결제를 확인하고 있어요</h1>
      <p className="complete-desc">잠시만 기다려 주세요. 창을 닫지 마세요.</p>
    </div>
  )
}

export default OrderSuccess
