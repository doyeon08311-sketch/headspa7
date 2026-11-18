import { Link, useSearchParams } from 'react-router-dom'
import { clearPendingOrder } from '../utils/payment.js'
import './ListPage.css'
import './SubPage.css'

/* 결제창에서 실패 · 취소로 돌아오는 곳 (?code=…&message=…) — 장바구니는 그대로 */
function OrderFail() {
  const [params] = useSearchParams()
  const cancelled = params.get('code') === 'PAY_PROCESS_CANCELED'
  clearPendingOrder()

  return (
    <div className="list-page complete">
      <h1 className="t-promo">{cancelled ? '결제를 취소했어요' : '결제에 실패했어요'}</h1>
      <p className="complete-desc">
        {cancelled ? '장바구니에 담긴 상품은 그대로 있어요.' : params.get('message') || '잠시 후 다시 시도해 주세요.'}
      </p>
      <div className="complete-buttons">
        <Link to="/" className="btn btn--outline">
          홈으로
        </Link>
        <Link to="/cart" className="btn btn--primary">
          장바구니로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default OrderFail
