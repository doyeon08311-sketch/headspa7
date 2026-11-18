import { Link, useLocation } from 'react-router-dom'
import { formatPrice } from '../utils/product.js'
import './ListPage.css'
import './SubPage.css'

/* 주문 완료 — 토스 결제 승인 후(OrderSuccess) 또는 연습용 주문 후 이동 */
function OrderComplete() {
  const { state } = useLocation()

  return (
    <div className="list-page complete">
      <div className="complete-icon" aria-hidden="true">
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 13l10 10L32 3" />
        </svg>
      </div>
      <h1 className="t-promo">주문이 완료되었어요</h1>
      <p className="complete-desc">헤드스파7을 이용해 주셔서 감사합니다.</p>

      {state && (
        <dl className="complete-summary">
          {state.orderId && (
            <>
              <dt>주문 번호</dt>
              <dd>{state.orderId}</dd>
            </>
          )}
          {state.firstName && (
            <>
              <dt>주문 상품</dt>
              <dd>
                {state.firstName}
                {state.kinds > 1 && ` 외 ${state.kinds - 1}종`} (총 {state.count}개)
              </dd>
            </>
          )}
          {state.couponDiscount > 0 && (
            <>
              <dt>쿠폰 할인</dt>
              <dd>−{formatPrice(state.couponDiscount)}</dd>
            </>
          )}
          <dt>결제 금액</dt>
          <dd>
            <strong>{formatPrice(state.total)}</strong>
          </dd>
        </dl>
      )}

      <div className="complete-buttons">
        <Link to="/" className="btn btn--outline">
          홈으로
        </Link>
        <Link to="/best" className="btn btn--primary">
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  )
}

export default OrderComplete
