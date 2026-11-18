import { Link } from 'react-router-dom'
import { heroSlides } from '../../data/home.js'
import useSnapCarousel from '../../hooks/useSnapCarousel.js'

/* 메인 배너 — 4초마다 자동으로 넘어가고, 손가락으로 넘길 수 있음
   누르면 해당 상품 상세로 이동 (마우스로 끌어 넘길 때는 이동하지 않음) */
function HeroSlider() {
  const { trackRef, index, onScroll } = useSnapCarousel(heroSlides.length, 4000)

  return (
    <section className="hero">
      <div className="hero-track snap-track" ref={trackRef} onScroll={onScroll}>
        {heroSlides.map((slide, i) => (
          <Link key={slide.image} to={`/product/${slide.productId}`} className="hero-slide">
            <img src={slide.image} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </Link>
        ))}
      </div>

      <p className="hero-count">
        <span className="t-pagination">{index + 1}</span>
        <span className="t-pagination-light"> / {heroSlides.length} +</span>
      </p>
    </section>
  )
}

export default HeroSlider
