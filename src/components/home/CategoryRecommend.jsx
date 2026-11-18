import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../utils/product.js'
import { recommendTabs } from '../../data/home.js'
import ProductCard from '../product/ProductCard.jsx'

/* 선택한 탭의 상품 3개 — 프리미엄 라인 먼저, 그다음 순위 높은 순 */
function getRecommend(tab) {
  return products
    .filter((p) => tab.categories.includes(p.category))
    .sort((a, b) => {
      if (a.line !== b.line) return a.line === 'premium' ? -1 : 1
      return (a.rank ?? 99) - (b.rank ?? 99)
    })
    .slice(0, 3)
}

function CategoryRecommend() {
  const [active, setActive] = useState(0)
  const tab = recommendTabs[active]
  const items = getRecommend(tab)

  const next = () => setActive((active + 1) % recommendTabs.length)

  return (
    <section className="home-section">
      <h2 className="home-title t-section">카테고리별 오늘의 추천 상품</h2>

      <div className="recommend-tabs" role="tablist">
        {recommendTabs.map((t, i) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`t-category ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="recommend-banner">
        {/* 배너(이미지 + 문구)를 누르면 Premium Care 페이지로 */}
        <Link to="/premium" className="recommend-banner-link">
          <img src="/images/main/category-best-bg.png" alt="" />
          <div className="recommend-banner-text">
            <p className="t-eyebrow">HIGHEND HAIR &amp; SCALP CARE</p>
            <h3 className="t-section">더 특별한 케어, H7 프리미엄 라인업</h3>
          </div>
        </Link>
        <button type="button" className="recommend-next" aria-label="다음 카테고리" onClick={next}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m1 1 6 6-6 6" />
          </svg>
        </button>
      </div>

      <ul className="recommend-list">
        {items.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} variant="row" showHashtags />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoryRecommend
