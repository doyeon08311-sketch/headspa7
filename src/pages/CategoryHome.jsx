import { Link } from 'react-router-dom'
import { products, CATEGORY_LABELS } from '../utils/product.js'
import { categoryShortcuts } from '../data/home.js'
import './ListPage.css'
import './SubPage.css'

const countOf = (fn) => products.filter(fn).length

const LINES = [
  { to: '/daily', name: 'Daily Care', desc: '매일 쓰는 데일리 헤어케어', line: 'daily' },
  { to: '/premium', name: 'Premium Care', desc: '앰플로 완성하는 H7 시그니처', line: 'premium' },
]

/* 하단 메뉴 '카테고리' — 라인 · 카테고리 한눈에 보기 */
function CategoryHome() {
  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">CATEGORY</p>
        <h1 className="t-promo">카테고리</h1>
      </header>

      {/* 라인별 */}
      <section className="cat-lines">
        {LINES.map((l) => (
          <Link key={l.to} to={l.to} className={`cat-line cat-line--${l.line}`}>
            <strong>{l.name}</strong>
            <span>{l.desc}</span>
            <em>{countOf((p) => p.line === l.line)}개 상품</em>
          </Link>
        ))}
      </section>

      {/* 카테고리별 */}
      <ul className="cat-list">
        <li>
          <Link to="/category/all">
            <span className="cat-list-img cat-list-img--all" aria-hidden="true">ALL</span>
            <span className="cat-list-name">전체 상품</span>
            <span className="cat-list-count">{products.length}</span>
          </Link>
        </li>
        {categoryShortcuts.map((c) => (
          <li key={c.key}>
            <Link to={`/category/${c.key}`}>
              <span className="cat-list-img">
                <img src={c.image} alt="" />
              </span>
              <span className="cat-list-name">{CATEGORY_LABELS[c.key]}</span>
              <span className="cat-list-count">{countOf((p) => p.category === c.key)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryHome
