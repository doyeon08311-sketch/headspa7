import { NavLink } from 'react-router-dom'
import { docs } from '../data/docs.js'
import './ListPage.css'
import './SubPage.css'

const TABS = [
  { to: '/guide', label: '이용안내' },
  { to: '/terms', label: '이용약관' },
  { to: '/privacy', label: '개인정보처리방침' },
]

/* 이용약관 · 개인정보처리방침 · 이용안내 공통 — doc="terms" | "privacy" | "guide" */
function InfoPage({ doc }) {
  const { eyebrow, title, sections } = docs[doc]

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">{eyebrow}</p>
        <h1 className="t-promo">{title}</h1>
      </header>

      <nav className="list-tabs list-tabs--nav info-tabs" aria-label="안내 문서">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} className={({ isActive }) => `t-category ${isActive ? 'is-active' : ''}`}>
            {t.label}
          </NavLink>
        ))}
      </nav>

      <article className="info-body">
        <p className="info-notice">연습용 쇼핑몰의 예시 문서입니다.</p>
        {sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </section>
        ))}
      </article>
    </div>
  )
}

export default InfoPage
