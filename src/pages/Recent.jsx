import { useState } from 'react'
import { getProductsByIds } from '../utils/product.js'
import { getRecent, clearRecent } from '../utils/storage.js'
import ProductCard from '../components/product/ProductCard.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import './ListPage.css'
import './SubPage.css'

/* 최근 본 상품 — 상품 상세를 열 때마다 기록됨 (최신순, 최대 20개) */
function Recent() {
  const [ids, setIds] = useState(getRecent)
  const list = getProductsByIds(ids)

  const clearAll = () => {
    clearRecent()
    setIds([])
  }

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">RECENTLY VIEWED</p>
        <h1 className="t-promo">최근 본 상품</h1>
      </header>

      {list.length === 0 ? (
        <EmptyState title="최근 본 상품이 없어요." desc="상품을 둘러보면 여기에 차례로 쌓여요." />
      ) : (
        <>
          <div className="cart-toolbar">
            <p>
              총 <strong>{list.length}</strong>개
            </p>
            <button type="button" onClick={clearAll}>
              전체 삭제
            </button>
          </div>
          <section className="list-body">
            <div className="product-grid">
              {list.map((product) => (
                <ProductCard key={product.id} product={product} showHashtags />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default Recent
