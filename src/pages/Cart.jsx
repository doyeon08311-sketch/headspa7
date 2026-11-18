import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products, formatPrice } from '../utils/product.js'
import { getUser, markCouponUsed } from '../utils/storage.js'
import { getAvailableCoupon } from '../utils/coupon.js'
import { calcCouponDiscount } from '../data/coupons.js'
import Emoji from '../components/common/Emoji.jsx'
import { isPaymentCancelled, paymentReady, requestCardPayment } from '../utils/payment.js'
import useCart from '../cart/useCart.js'
import QtyStepper from '../components/common/QtyStepper.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import './ListPage.css'
import './SubPage.css'

function Cart() {
  const navigate = useNavigate()
  const { items, count, updateQty, removeItem, clearCart, showToast } = useCart()
  const [paying, setPaying] = useState(false)

  // 장바구니 항목에 상품 정보 붙이기 (없어진 상품은 제외)
  const rows = items
    .map((item) => ({ ...item, product: products.find((p) => p.id === item.id) }))
    .filter((row) => row.product)

  const original = rows.reduce((s, r) => s + r.product.price * r.qty, 0)
  const total = rows.reduce((s, r) => s + r.product.salePrice * r.qty, 0)
  const discount = original - total

  // 쿠폰: 쓸 수 있는 쿠폰이 있고 금액 조건을 넘으면 기본으로 적용
  const coupon = getAvailableCoupon(getUser())
  const [useCoupon, setUseCoupon] = useState(true)
  const couponEligible = !!coupon && total >= coupon.minAmount
  const couponOff = couponEligible && useCoupon ? calcCouponDiscount(coupon, total) : 0
  const payAmount = total - couponOff

  const order = async () => {
    // 비회원이면 로그인 먼저 → 로그인 후 장바구니로 돌아옴
    if (!getUser()) {
      showToast('로그인 후 주문할 수 있어요.')
      navigate('/login', { state: { from: '/cart' } })
      return
    }

    // kinds: 상품 종류 수, count: 전체 수량, total: 실제 결제 금액
    const couponId = couponOff > 0 ? coupon.id : null
    const summary = { kinds: rows.length, count, total: payAmount, couponDiscount: couponOff, firstName: rows[0].product.name }

    // 결제 키가 없으면 연습용: 결제 없이 바로 주문 완료
    if (!paymentReady) {
      if (couponId) markCouponUsed(getUser().email, couponId)
      clearCart()
      navigate('/order/complete', { state: summary })
      return
    }

    // 토스 결제창 → 끝나면 /order/success 로 돌아옴 (장바구니는 결제 승인 후에 비움)
    setPaying(true)
    try {
      await requestCardPayment({
        items: rows.map(({ id, qty }) => ({ id, qty })),
        total: payAmount,
        couponId,
        orderName: summary.firstName + (summary.kinds > 1 ? ` 외 ${summary.kinds - 1}건` : ''),
        summary,
        user: getUser(),
      })
    } catch (err) {
      if (!isPaymentCancelled(err)) showToast(err?.message || '결제창을 열지 못했어요. 잠시 후 다시 시도해 주세요.')
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">CART</p>
        <h1 className="t-promo">장바구니</h1>
      </header>

      {rows.length === 0 ? (
        <EmptyState title="장바구니가 비어 있어요." desc="마음에 드는 상품을 담아 보세요." />
      ) : (
        <>
          <div className="cart-toolbar">
            <p>
              총 <strong>{count}</strong>개
            </p>
            <button type="button" onClick={clearCart}>
              전체 삭제
            </button>
          </div>

          <ul className="cart-list">
            {rows.map(({ id, qty, product }) => (
              <li key={id} className="cart-item">
                <Link to={`/product/${id}`} className="cart-thumb">
                  <img src={product.image} alt="" />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/product/${id}`} className="cart-item-name">
                    {product.name}
                  </Link>
                  <p className="cart-item-price">
                    {product.price > product.salePrice && <del>{formatPrice(product.price * qty)}</del>}
                    <strong>{formatPrice(product.salePrice * qty)}</strong>
                  </p>
                  <QtyStepper value={qty} onChange={(v) => updateQty(id, v)} label={`${product.name} 수량`} />
                </div>
                <button type="button" className="cart-remove" aria-label={`${product.name} 삭제`} onClick={() => removeItem(id)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M1 1l12 12M13 1 1 13" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <section className="cart-summary">
            {/* 쿠폰 선택 (쓸 수 있는 쿠폰이 있을 때만) */}
            {coupon && (
              <label className={`cart-coupon${couponEligible ? '' : ' is-disabled'}`}>
                <input
                  type="checkbox"
                  checked={couponEligible && useCoupon}
                  disabled={!couponEligible}
                  onChange={(e) => setUseCoupon(e.target.checked)}
                />
                <span className="cart-coupon-text">
                  <strong>
                    <Emoji name="gift" /> {coupon.name} 적용
                  </strong>
                  <span>
                    {couponEligible
                      ? `${formatPrice(calcCouponDiscount(coupon, total))} 할인 (${coupon.summary})`
                      : `${formatPrice(coupon.minAmount - total)} 더 담으면 쓸 수 있어요 (${coupon.summary})`}
                  </span>
                </span>
              </label>
            )}
            <dl>
              <dt>총 상품금액</dt>
              <dd>{formatPrice(original)}</dd>
              <dt>할인 금액</dt>
              <dd className="cart-discount">−{formatPrice(discount)}</dd>
              {couponOff > 0 && (
                <>
                  <dt>쿠폰 할인</dt>
                  <dd className="cart-discount">−{formatPrice(couponOff)}</dd>
                </>
              )}
              <dt>배송비</dt>
              <dd>무료</dd>
              <dt className="cart-total-label">결제 예정 금액</dt>
              <dd className="cart-total">{formatPrice(payAmount)}</dd>
            </dl>
            <button type="button" className="btn btn--primary btn--block" onClick={order} disabled={paying}>
              {paying ? '결제창 여는 중…' : `${formatPrice(payAmount)} 주문하기`}
            </button>
            <p className="cart-note">
              {paymentReady ? '테스트 결제라 실제로 돈이 나가지 않아요.' : '연습용 쇼핑몰이라 실제 결제는 이루어지지 않아요.'}
            </p>
          </section>
        </>
      )}
    </div>
  )
}

export default Cart
