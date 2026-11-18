import { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useCart from '../../cart/useCart.js'
import MenuDrawer from './MenuDrawer.jsx'
import './Header.css'

const MENUS = [
  { to: '/', label: '홈' },
  { to: '/best', label: '베스트' },
  { to: '/daily', label: 'Daily Care' },
  { to: '/premium', label: 'Premium Care' },
]

function Header() {
  const [showAnnounce, setShowAnnounce] = useState(true)
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      {/* 띠배너 */}
      {showAnnounce && (
        <div className="announce">
          <Link to="/join" className="t-announce">회원가입 시 10% 할인 쿠폰 지급!</Link>
          <button type="button" className="announce-close" aria-label="띠배너 닫기" onClick={() => setShowAnnounce(false)}>
            <svg width="14" height="14" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2l14 14M16 2 2 16" />
            </svg>
          </button>
        </div>
      )}

      {/* 헤더 (스크롤해도 위에 고정) */}
      <header className="header">
        <div className="header-bar">
          <button type="button" className="header-icon" aria-label="전체 메뉴" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <svg width="28" height="20" viewBox="0 0 28 20" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M0 1h28M0 10h28M0 19h28" />
            </svg>
          </button>

          <Link to="/" className="header-logo">
            <img src="/images/common/logo.jpg" alt="HEADSPA7" />
          </Link>

          <div className="header-actions">
            <Link to="/search" className="header-icon" aria-label="검색">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="8.5" />
                <path d="m17 17 7.5 7.5" />
              </svg>
            </Link>
            <Link to="/cart" className="header-icon header-cart" aria-label={`장바구니 ${count}개`}>
              <svg width="26" height="28" viewBox="0 0 26 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 8h22v18H2z" />
                <path d="M8 11V6a5 5 0 0 1 10 0v5" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                <span key={count} className="header-cart-count" aria-hidden="true">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="header-nav">
          {MENUS.map((menu) => (
            <NavLink key={menu.to} to={menu.to} end className="t-nav">
              {menu.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <MenuDrawer open={menuOpen} onClose={closeMenu} />
    </>
  )
}

export default Header
