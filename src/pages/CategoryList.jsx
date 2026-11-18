import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { products, CATEGORY_LABELS, sortProducts } from '../utils/product.js'
import ProductCard from '../components/product/ProductCard.jsx'
import SortBar from '../components/product/SortBar.jsx'
import NotFound from './NotFound.jsx'
import './ListPage.css'

/* /category/all, /category/shampoo ... — 라인 구분 없이 카테고리별 상품 */
function CategoryList() {
  const { key } = useParams()
  const [sort, setSort] = useState('recommend')

  if (key !== 'all' && !CATEGORY_LABELS[key]) return <NotFound message="카테고리를 찾을 수 없어요." />

  const title = key === 'all' ? '전체 상품' : CATEGORY_LABELS[key]
  const list = sortProducts(key === 'all' ? products : products.filter((p) => p.category === key), sort)

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">CATEGORY</p>
        <h1 className="t-promo">{title}</h1>
      </header>

      <nav className="list-tabs list-tabs--nav" aria-label="카테고리">
        {['all', ...Object.keys(CATEGORY_LABELS)].map((k) => (
          <NavLink key={k} to={`/category/${k}`} className={({ isActive }) => `t-category ${isActive ? 'is-active' : ''}`}>
            {k === 'all' ? '전체' : CATEGORY_LABELS[k]}
          </NavLink>
        ))}
      </nav>

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

export default CategoryList
