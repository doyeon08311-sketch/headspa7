import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { searchProducts } from '../utils/search.js'
import { getSearches, addSearch, removeSearch, clearSearches } from '../utils/storage.js'
import { SEARCH_KEYWORDS } from '../data/search.js'
import ProductCard from '../components/product/ProductCard.jsx'
import './ListPage.css'
import './SubPage.css'

/* 추천 키워드 버튼 묶음 */
function KeywordChips({ title }) {
  return (
    <section className="search-block">
      <h2>{title}</h2>
      <ul className="search-chips">
        {SEARCH_KEYWORDS.map((k) => (
          <li key={k.label}>
            <Link to={`/search?q=${encodeURIComponent(k.label)}`}>#{k.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SearchView({ query }) {
  const navigate = useNavigate()
  const [input, setInput] = useState(query)
  const [history, setHistory] = useState(getSearches)
  const results = query ? searchProducts(query) : []

  const onSubmit = (e) => {
    e.preventDefault()
    const q = input.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  const remove = (word) => {
    removeSearch(word)
    setHistory(getSearches())
  }

  const clearAll = () => {
    clearSearches()
    setHistory([])
  }

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">SEARCH</p>
        <h1 className="t-promo">검색</h1>
      </header>

      <form className="search-form" role="search" onSubmit={onSubmit}>
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="헤어 고민을 검색해 보세요."
          aria-label="검색어"
          autoFocus={!query}
        />
        <button type="submit" aria-label="검색">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5 21 21" />
          </svg>
        </button>
      </form>

      {!query ? (
        <>
          {history.length > 0 && (
            <section className="search-block">
              <div className="search-block-head">
                <h2>최근 검색어</h2>
                <button type="button" onClick={clearAll}>
                  전체 삭제
                </button>
              </div>
              <ul className="search-chips search-chips--history">
                {history.map((word) => (
                  <li key={word}>
                    <Link to={`/search?q=${encodeURIComponent(word)}`}>{word}</Link>
                    <button type="button" aria-label={`${word} 삭제`} onClick={() => remove(word)}>
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <KeywordChips title="추천 키워드" />
        </>
      ) : results.length > 0 ? (
        <section className="list-body">
          <p className="search-result-count">
            <strong>‘{query}’</strong> 검색 결과 <em>{results.length}</em>개
          </p>
          <div className="product-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} showHashtags />
            ))}
          </div>
        </section>
      ) : (
        <>
          <div className="search-empty">
            <p className="t-section">‘{query}’ 검색 결과가 없어요.</p>
            <p>다른 단어로 검색하거나 아래 키워드를 눌러 보세요.</p>
          </div>
          <KeywordChips title="이런 키워드는 어때요?" />
        </>
      )}
    </div>
  )
}

/* /search?q=검색어 — 검색어가 바뀌면 입력칸도 그 값으로 새로 시작 */
function Search() {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').trim()

  // 검색어로 들어오면 최근 검색어에 기록 (검색창 · 키워드 · 주소 직접 입력 모두)
  useEffect(() => {
    if (query) addSearch(query)
  }, [query])

  return <SearchView key={query} query={query} />
}

export default Search
