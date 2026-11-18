import { useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CATEGORY_LABELS } from '../../utils/product.js'
import { getUser } from '../../utils/storage.js'
import { logOut } from '../../utils/auth.js'
import { categoryShortcuts } from '../../data/home.js'
import useCart from '../../cart/useCart.js'
import Icon from '../common/Icon.jsx'
import './MenuDrawer.css'

const SHOP_LINKS = [
  { to: '/cart', label: '장바구니', icon: 'bag' },
  { to: '/recent', label: '최근 본 상품', icon: 'clock' },
  { to: '/search', label: '검색', icon: 'search' },
  { to: '/mypage', label: '마이페이지', icon: 'user' },
]

/* 전체 메뉴 — 가운데 영역 왼쪽에서 밀려 나오는 패널
   - 바깥(어두운 부분) 클릭, 닫기 버튼, Esc 키, 메뉴 링크 클릭 시 닫힘
   - 열려 있는 동안 뒤 페이지 스크롤 막음 */
function MenuDrawer({ open, onClose }) {
  const navigate = useNavigate()
  const { count, showToast } = useCart()
  const closeRef = useRef(null)
  const user = open ? getUser() : null

  const logout = () => {
    logOut()
    onClose()
    navigate('/')
    showToast('로그아웃되었어요.')
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // 패널 안의 링크를 누르면 닫기
  const onClickInside = (e) => {
    if (e.target.closest('a')) onClose()
  }

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="drawer-dim" onClick={onClose} />

      <nav className="drawer-panel" role="dialog" aria-modal="true" aria-label="전체 메뉴" onClick={onClickInside}>
        <div className="drawer-top">
          <Link to="/" className="drawer-logo">
            <img src="/images/common/logo.jpg" alt="HEADSPA7 홈" />
          </Link>
          <button type="button" ref={closeRef} className="drawer-close" aria-label="메뉴 닫기" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2l14 14M16 2 2 16" />
            </svg>
          </button>
        </div>

        {/* 회원: 로그인 전 → 로그인 · 회원가입 / 로그인 후 → 인사 · 마이페이지 · 로그아웃 */}
        <div className="drawer-user">
          {user ? (
            <>
              <p className="drawer-user-hello">
                <Icon name="user" size={18} />
                <span>
                  <strong>{user.name}</strong>님, 반가워요!
                </span>
              </p>
              <div className="drawer-auth">
                <Link to="/mypage">
                  <Icon name="user" size={18} />
                  마이페이지
                </Link>
                <button type="button" onClick={logout}>
                  <Icon name="logOut" size={18} />
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="drawer-user-hello">
                <Icon name="gift" size={18} />
                <span>
                  회원가입하고 <strong>10% 쿠폰</strong> 받기
                </span>
              </p>
              <div className="drawer-auth">
                <Link to="/login">
                  <Icon name="logIn" size={18} />
                  로그인
                </Link>
                <Link to="/join" className="is-primary">
                  <Icon name="userPlus" size={18} />
                  회원가입
                </Link>
              </div>
            </>
          )}
        </div>

        {/* 카테고리 (강조) — 큰 이미지 + 이름 */}
        <section className="drawer-cat-section">
          <div className="drawer-cat-head">
            <h2>카테고리</h2>
            <Link to="/category/all">전체보기</Link>
          </div>
          <ul className="drawer-cats">
            {categoryShortcuts.map((c) => (
              <li key={c.key}>
                <NavLink to={`/category/${c.key}`}>
                  <img src={c.image} alt="" />
                  <span className="drawer-cat-name">{CATEGORY_LABELS[c.key]}</span>
                  <span className="drawer-cat-arrow" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        {/* 쇼핑 · 안내 */}
        <section className="drawer-section">
          <h2>쇼핑</h2>
          <ul className="drawer-links">
            {SHOP_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>
                  <Icon name={l.icon} size={20} />
                  {l.label}
                  {l.to === '/cart' && count > 0 && <em>{count}</em>}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <a href="tel:1661-6170" className="drawer-cs">
          <Icon name="phone" size={18} />
          고객센터 <strong>1661-6170</strong>
        </a>
      </nav>
    </div>
  )
}

export default MenuDrawer
