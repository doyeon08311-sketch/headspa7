import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products, formatPrice, getDiscountRate, getHashtags, CATEGORY_LABELS } from '../utils/product.js'
import { addRecent, getUser } from '../utils/storage.js'
import useCart from '../cart/useCart.js'
import useDragScroll from '../hooks/useDragScroll.js'
import ProductCard from '../components/product/ProductCard.jsx'
import Stars from '../components/product/Stars.jsx'
import QtyStepper from '../components/common/QtyStepper.jsx'
import NotFound from './NotFound.jsx'
import './ProductDetail.css'

const LINE_LABELS = { daily: 'Daily Care', premium: 'Premium Care' }

function ProductDetail({ product }) {
  const navigate = useNavigate()
  const { addItem, showToast } = useCart()
  const [qty, setQty] = useState(1)
  const relatedRef = useRef(null)
  useDragScroll(relatedRef)

  // 최근 본 상품에 기록
  useEffect(() => {
    addRecent(product.id)
  }, [product.id])

  const rate = getDiscountRate(product)
  const reviews = product.reviews ?? []
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0
  const isSet = product.category === 'travel'
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6)

  // 바로 구매: 장바구니에 담고 → 비회원이면 로그인 먼저 (로그인 후 장바구니로 돌아옴)
  const buyNow = () => {
    addItem(product, qty)
    if (getUser()) {
      navigate('/cart')
      return
    }
    showToast('로그인 후 주문할 수 있어요.')
    navigate('/login', { state: { from: '/cart' } })
  }

  return (
    <div className="detail">
      {/* 이미지 */}
      <div className="detail-image">
        <img src={product.image} alt={product.name} />
        {product.rank && <span className="detail-rank">BEST {product.rank}</span>}
      </div>

      {/* 기본 정보 */}
      <section className="detail-info">
        {/* 위치 경로: 회색 작은 글씨 + › 구분 */}
        <nav className="detail-path" aria-label="상품 위치">
          <Link to={`/${product.line}`}>{LINE_LABELS[product.line]}</Link>
          <span aria-hidden="true">›</span>
          <Link to={`/category/${product.category}`}>{CATEGORY_LABELS[product.category]}</Link>
        </nav>
        <h1 className="detail-name">{product.name}</h1>
        <ul className="detail-hashtags">
          {getHashtags(product).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {reviews.length > 0 && (
          <a href="#reviews" className="detail-rating">
            <Stars rating={avg} />
            <strong>{avg.toFixed(1)}</strong>
            <span>리뷰 {reviews.length}개</span>
          </a>
        )}

        <div className="detail-price">
          {rate > 0 && <del className="t-price-original">{formatPrice(product.price)}</del>}
          <p>
            {rate > 0 && <span className="detail-rate">{rate}%</span>}
            <strong>{formatPrice(product.salePrice)}</strong>
          </p>
        </div>

        <dl className="detail-meta">
          {product.volume && (
            <>
              <dt>용량</dt>
              <dd>
                {product.volume}
                {product.unit}
                {product.unitPrice && (
                  <span className="detail-unit-price">
                    (100{product.unit}당 {formatPrice(product.unitPrice)})
                  </span>
                )}
              </dd>
            </>
          )}
          <dt>배송비</dt>
          <dd>무료배송</dd>
        </dl>

        {/* 구매 */}
        <div className="detail-buy">
          <div className="detail-buy-row">
            <QtyStepper value={qty} onChange={setQty} />
            <p className="detail-total">
              총 <strong>{formatPrice(product.salePrice * qty)}</strong>
            </p>
          </div>
          <div className="detail-buy-buttons">
            <button type="button" className="btn btn--outline" onClick={() => addItem(product, qty)}>
              장바구니 담기
            </button>
            <button type="button" className="btn btn--primary" onClick={buyNow}>
              바로 구매
            </button>
          </div>
        </div>
      </section>

      {/* 제품 특징 / 세트 구성 */}
      <section className="detail-section">
        <h2 className="t-section">{isSet ? '세트 구성' : '제품 특징'}</h2>
        <ul className={isSet ? 'detail-set' : 'detail-features'}>
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      {/* 리뷰 */}
      <section className="detail-section" id="reviews">
        <h2 className="t-section">
          리뷰 <span className="detail-count">{reviews.length}</span>
        </h2>
        {reviews.length > 0 && (
          <div className="detail-review-summary">
            <strong>{avg.toFixed(1)}</strong>
            <Stars rating={avg} size={18} />
          </div>
        )}
        <ul className="detail-reviews">
          {reviews.map((r) => (
            <li key={r.id}>
              <div className="detail-review-head">
                <Stars rating={r.rating} size={13} />
                <span>{r.author}</span>
                <time dateTime={r.date}>{r.date}</time>
              </div>
              <p>{r.content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 같은 카테고리 상품 */}
      {related.length > 0 && (
        <section className="detail-section">
          <h2 className="t-section">함께 보면 좋은 {CATEGORY_LABELS[product.category]}</h2>
          <ul className="hscroll detail-related" ref={relatedRef}>
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

/* 주소의 번호로 상품을 찾아서 보여줌 (번호가 바뀌면 수량 등 상태 초기화) */
function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  if (!product) return <NotFound message="상품을 찾을 수 없어요." />
  return <ProductDetail key={product.id} product={product} />
}

export default ProductDetailPage
