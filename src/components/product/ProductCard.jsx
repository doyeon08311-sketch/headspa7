import { Link } from 'react-router-dom'
import { formatPrice, getDiscountRate, getTags, getHashtags } from '../../utils/product.js'
import useCart from '../../cart/useCart.js'
import './ProductCard.css'

/* 상품 카드
   - variant="grid": 이미지 위, 정보 아래 (기본)
   - variant="row" : 이미지 왼쪽, 정보 오른쪽
   - rank: 숫자를 주면 왼쪽 위에 순위 배지 (1~3위는 청록색)
   - showHashtags: 상품명 아래 효능 해시태그(#세정력 #풍부한거품) 표시
   - 이미지 오른쪽 아래에 장바구니 담기 버튼
     (버튼은 링크 안에 넣을 수 없어서 이미지 링크 · 정보 링크 · 버튼을 나눔) */
/* 장바구니(쇼핑백) 아이콘 */
function CartIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 26 28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9h20l-1.2 16.2a1 1 0 0 1-1 .8H5.2a1 1 0 0 1-1-.8z" />
      <path d="M8.5 12V7a4.5 4.5 0 0 1 9 0v5" />
    </svg>
  )
}

/* label: 상품명 위에 넣을 짧은 머리말 (예: 베스트 1위 "👑 BEST 1 …") */
function ProductCard({ product, variant = 'grid', rank, showHashtags = false, className = '', label }) {
  const { addItem } = useCart()
  const rate = getDiscountRate(product)
  const tags = getTags(product)
  const href = `/product/${product.id}`

  return (
    <div className={`pcard pcard--${variant} ${showHashtags ? 'has-hashtags' : ''} ${className}`}>
      <div className="pcard-thumb">
        {/* 이미지 링크는 아래 정보 링크와 같은 곳이라 키보드 이동에서는 건너뜀 */}
        <Link to={href} tabIndex={-1} aria-hidden="true">
          <img src={product.image} alt="" loading="lazy" />
        </Link>
        {rank && <span className={`pcard-rank t-rank ${rank <= 3 ? 'is-top' : ''}`}>{rank}</span>}
        <button type="button" className="pcard-cart" aria-label={`${product.name} 장바구니 담기`} onClick={() => addItem(product)}>
          <CartIcon />
        </button>
      </div>

      <Link to={href} className="pcard-info">
        {label}
        <p className="pcard-name t-product-name">{product.name}</p>

        {showHashtags && (
          <ul className="pcard-hashtags">
            {getHashtags(product).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <div className="pcard-price">
          {rate > 0 && <del className="t-price-original">{formatPrice(product.price)}</del>}
          <p>
            {rate > 0 && <span className="pcard-rate t-discount">{rate}%</span>}
            <strong className="t-price">{formatPrice(product.salePrice)}</strong>
          </p>
        </div>

        <ul className="pcard-tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

export default ProductCard
