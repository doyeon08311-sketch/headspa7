import { Link } from 'react-router-dom'
import { magazines } from '../../data/magazine.js'
import useSnapCarousel from '../../hooks/useSnapCarousel.js'

function Magazine() {
  const { trackRef, index, goTo, onScroll } = useSnapCarousel(magazines.length)

  return (
    <section className="home-section magazine">
      <h2 className="home-title t-section">헤드스파7 매거진</h2>

      <div className="magazine-track snap-track" ref={trackRef} onScroll={onScroll}>
        {magazines.map((item) => (
          <Link key={item.id} to="/magazine" className="magazine-item">
            <img src={item.image} alt={item.title} loading="lazy" />
            <p className="magazine-caption">
              <span>{item.shortTitle ?? item.title}</span>
              {item.date && <time dateTime={item.date}>{item.date.replaceAll('-', '.')}</time>}
            </p>
          </Link>
        ))}
      </div>

      <div className="magazine-dots">
        {magazines.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${i + 1}번째 매거진`}
            className={i === index ? 'is-active' : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}

export default Magazine
