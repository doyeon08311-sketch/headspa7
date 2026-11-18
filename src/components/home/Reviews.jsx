import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../utils/product.js'
import { reviewItems } from '../../data/home.js'
import useDragScroll from '../../hooks/useDragScroll.js'
import Stars from '../product/Stars.jsx'

/* 상품마다 첫 번째 후기 하나씩 */
const items = reviewItems
  .map(({ productId, photo }) => {
    const product = products.find((item) => item.id === productId)
    return { product, photo, review: product?.reviews?.[0] }
  })
  .filter(({ product, review }) => product && review)

function Reviews() {
  const listRef = useRef(null)
  useDragScroll(listRef)

  return (
    <section className="home-section reviews">
      <h2 className="home-title t-section">리얼 후기로 만나는 헤드스파7</h2>
      <ul className="hscroll hscroll--reviews" ref={listRef}>
        {items.map(({ product, photo, review }) => (
          <li key={review.id} className="review-card">
            <div className="review-photo">
              <img src={photo} alt={`${product.name} 후기 사진`} loading="lazy" draggable="false" />
            </div>
            <div className="review-body">
              <Stars rating={review.rating} />
              <p className="review-text">{review.content}</p>
              <Link to={`/product/${product.id}`} className="review-product">
                <img src={product.image} alt="" loading="lazy" />
                <span>{product.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Reviews
