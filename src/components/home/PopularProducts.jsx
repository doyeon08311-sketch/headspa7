import { products } from '../../utils/product.js'
import ProductCard from '../product/ProductCard.jsx'

/* 순위(rank)가 있는 상품을 1위부터 6개 */
const popular = products
  .filter((p) => p.rank)
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 6)

function PopularProducts() {
  return (
    <section className="home-section">
      <h2 className="home-title t-section">당신을 위한 인기 상품</h2>
      <div className="popular-grid">
        {popular.map((product) => (
          <ProductCard key={product.id} product={product} rank={product.rank} />
        ))}
      </div>
    </section>
  )
}

export default PopularProducts
