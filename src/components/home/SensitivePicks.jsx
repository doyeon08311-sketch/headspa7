import { useRef } from 'react'
import { getProductsByIds } from '../../utils/product.js'
import { sensitivePickIds } from '../../data/home.js'
import useDragScroll from '../../hooks/useDragScroll.js'
import ProductCard from '../product/ProductCard.jsx'

const picks = getProductsByIds(sensitivePickIds)

function SensitivePicks() {
  const listRef = useRef(null)
  useDragScroll(listRef)

  return (
    <section className="home-section">
      <h2 className="home-title t-section">예민한 두피를 위한 추천템</h2>
      <ul className="hscroll hscroll--picks" ref={listRef}>
        {picks.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} showHashtags />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SensitivePicks
