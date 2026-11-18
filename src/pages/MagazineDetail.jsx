import { Link, useParams } from 'react-router-dom'
import { getMagazine, magazines } from '../data/magazine.js'
import NotFound from './NotFound.jsx'
import './Magazine.css'

/* 매거진 본문 — 제목 · 날짜 → 본문 이미지 → 본문 → 이전/다음 글 */
function MagazineDetail() {
  const { id } = useParams()
  const item = getMagazine(id)
  if (!item) return <NotFound />

  const index = magazines.indexOf(item)
  const prev = magazines[index - 1]
  const next = magazines[index + 1]

  return (
    <article className="mag-detail">
      <header className="mag-detail-head">
        <Link to="/magazine" className="mag-detail-path">
          매거진
        </Link>
        <h1 className="mag-detail-title">{item.title}</h1>
        {item.date && (
          <time className="mag-date" dateTime={item.date}>
            {item.date.replaceAll('-', '.')}
          </time>
        )}
      </header>

      <div className={`mag-detail-image ${item.bodyImageSmall ? 'mag-detail-image--small' : ''}`}>
        {item.bodyImage ? (
          <img src={item.bodyImage} alt={item.bodyImageAlt ?? ''} />
        ) : (
          <div className="mag-detail-placeholder">본문 이미지 자리</div>
        )}
      </div>

      <div className="mag-detail-body">
        {item.body.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>

      {item.source && (
        <p className="mag-detail-source">
          <strong>출처</strong>
          {item.source}
        </p>
      )}

      <nav className="mag-detail-nav" aria-label="다른 매거진">
        {[
          { label: '이전 글', item: prev, arrow: 'M2 8l5-5 5 5' },
          { label: '다음 글', item: next, arrow: 'M2 3l5 5 5-5' },
        ].map(({ label, item: other, arrow }) => (
          <div key={label} className="mag-nav-row">
            <span className="mag-nav-label">
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={arrow} />
              </svg>
              {label}
            </span>
            {other ? (
              <Link to={`/magazine/${other.id}`} className="mag-nav-title">
                {other.shortTitle ?? other.title}
              </Link>
            ) : (
              <span className="mag-nav-title is-empty">{label}이 없습니다.</span>
            )}
          </div>
        ))}
      </nav>

      <div className="mag-detail-back">
        <Link to="/magazine" className="btn btn--outline btn--block">
          목록으로
        </Link>
      </div>
    </article>
  )
}

export default MagazineDetail
