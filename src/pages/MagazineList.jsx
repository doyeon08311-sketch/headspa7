import { Link } from 'react-router-dom'
import { magazines } from '../data/magazine.js'
import './ListPage.css'
import './Magazine.css'

/* 매거진 목록 — 세로 배치 */
function MagazineList() {
  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">MAGAZINE</p>
        <h1 className="t-promo">헤드스파7 매거진</h1>
        <p className="page-head-desc">헤드스파7의 새로운 소식을 전해 드려요.</p>
      </header>

      <ul className="mag-list">
        {magazines.map((item) => (
          <li key={item.id}>
            <Link to={`/magazine/${item.id}`} className="mag-card">
              <div className="mag-card-thumb">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <h2 className="mag-card-title">{item.shortTitle ?? item.title}</h2>
              <p className="mag-card-summary">{item.body[0]}</p>
              {item.date && (
                <time className="mag-date" dateTime={item.date}>
                  {item.date.replaceAll('-', '.')}
                </time>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MagazineList
