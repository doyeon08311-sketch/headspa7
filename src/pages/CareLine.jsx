import { useState } from 'react'
import { products, CATEGORY_LABELS, sortProducts } from '../utils/product.js'
import ProductCard from '../components/product/ProductCard.jsx'
import SortBar from '../components/product/SortBar.jsx'
import PageBanner from '../components/common/PageBanner.jsx'
import './ListPage.css'

/* 라인별 상단 배너 (높이 270px)
   - banner: 이미지 경로. 비워 두면(null) 회색 자리표시가 나옴
   - 권장 이미지 크기: 1160 × 540px (화면 580 × 270 의 2배) */
const LINE_INFO = {
  daily: { name: 'Daily Care', banner: '/images/main/daily-care-Banner.png' },
  premium: { name: 'Premium Care', banner: '/images/main/premium-care-Banner.png' },
}

/* Daily Care / Premium Care 공통 페이지 — line="daily" | "premium" */
function CareLine({ line }) {
  const info = LINE_INFO[line]
  const lineProducts = products.filter((p) => p.line === line)

  // 이 라인에 실제로 있는 카테고리만 탭으로
  const categories = Object.keys(CATEGORY_LABELS).filter((key) => lineProducts.some((p) => p.category === key))

  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('recommend')

  const filtered = category === 'all' ? lineProducts : lineProducts.filter((p) => p.category === category)
  const list = sortProducts(filtered, sort)

  return (
    <div className="list-page">
      {/* 상단 배너 (이미지가 없으면 자리표시) */}
      <PageBanner name={info.name} src={info.banner} />

      {/* 카테고리 탭 */}
      <div className="list-tabs" role="tablist">
        {['all', ...categories].map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={category === key}
            className={`t-category ${category === key ? 'is-active' : ''}`}
            onClick={() => setCategory(key)}
          >
            {key === 'all' ? '전체' : CATEGORY_LABELS[key]}
          </button>
        ))}
      </div>

      <section className="list-body">
        <SortBar count={list.length} sort={sort} onChange={setSort} />
        <div className="product-grid">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} showHashtags />
          ))}
        </div>
      </section>
    </div>
  )
}

export default CareLine
