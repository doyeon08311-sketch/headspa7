import { products } from '../utils/product.js'
import ProductCard from '../components/product/ProductCard.jsx'
import PageBanner from '../components/common/PageBanner.jsx'
import Icon from '../components/common/Icon.jsx'
import './ListPage.css'

/* 상단 배너 이미지 — 받으면 경로를 넣기 (예: '/images/main/banner-best.png'), null 이면 자리표시 */
const BEST_BANNER = '/images/main/best-banner.png'

/* 순위(rank)가 있는 상품을 1위부터 */
const ranked = products.filter((p) => p.rank).sort((a, b) => a.rank - b.rank)
const [first, ...rest] = ranked
const topTwoThree = rest.slice(0, 2)
const others = rest.slice(2)

/* 1위 상품명 위 머리말 */
const firstLabel = (
  <span className="best-first-label">
    <strong className="best-first-badge best-first-badge--outline">
      <Icon name="crown" size={12.6} strokeWidth={2} />
      <span className="best-first-badge-text">BEST</span>
    </strong>
    <span className="best-first-text">지금 가장 사랑받는 제품</span>
  </span>
)

function Best() {
  return (
    <div className="list-page">
      <PageBanner name="베스트" src={BEST_BANNER} />

      {/* TOP 3 */}
      <section className="best-top">
        <ProductCard product={first} rank={first.rank} variant="row" className="best-first" showHashtags label={firstLabel} />
        <div className="product-grid">
          {topTwoThree.map((product) => (
            <ProductCard key={product.id} product={product} rank={product.rank} showHashtags />
          ))}
        </div>
      </section>

      {/* 4위부터 */}
      <section className="best-rest" aria-label={`4위부터 ${ranked.length}위까지`}>
        <div className="product-grid">
          {others.map((product) => (
            <ProductCard key={product.id} product={product} rank={product.rank} showHashtags />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Best
