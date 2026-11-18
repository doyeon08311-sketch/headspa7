import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEARCH_KEYWORDS } from '../../data/search.js'

function SideLeft() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const goSearch = (q) => navigate(`/search?q=${encodeURIComponent(q)}`)

  const onSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) goSearch(q)
    else navigate('/search') // 빈 검색어면 검색 페이지(추천 키워드)로
  }

  return (
    <aside className="side side-left">
      <div className="side-left-inner">
        <img className="side-left-logo" src="/images/common/logo-2.png" alt="HEADSPA7" />

        <form className="side-search" role="search" onSubmit={onSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="헤어 고민을 검색해 보세요."
            aria-label="검색어"
          />
          <button type="submit" aria-label="검색">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 21 21" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <ul className="side-keywords">
          {SEARCH_KEYWORDS.map(({ label }) => (
            <li key={label}>
              <button type="button" onClick={() => goSearch(label)}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        <img className="side-left-product" src="/images/main/outside.png" alt="" />
      </div>
    </aside>
  )
}

export default SideLeft
