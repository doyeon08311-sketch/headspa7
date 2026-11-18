import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecent, getUser } from '../utils/storage.js'
import { getAvailableCoupon } from '../utils/coupon.js'
import { logOut } from '../utils/auth.js'
import useCart from '../cart/useCart.js'
import './ListPage.css'
import './SubPage.css'

const MENUS = [
  { to: '/cart', label: '장바구니' },
  { to: '/recent', label: '최근 본 상품' },
  { to: '/best', label: '베스트 상품' },
  { to: '/guide', label: '이용안내' },
  { to: '/terms', label: '이용약관' },
  { to: '/privacy', label: '개인정보처리방침' },
]

/* 마이페이지 — 회원가입(연습용) 여부에 따라 인사말이 바뀜 */
function MyPage() {
  const { count } = useCart()
  const [user, setUser] = useState(getUser)
  const recentCount = getRecent().length
  const couponCount = user ? (getAvailableCoupon(user) ? 1 : 0) : 0

  const logout = () => {
    logOut()
    setUser(null)
  }

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">MY PAGE</p>
        <h1 className="t-promo">마이페이지</h1>
      </header>

      {/* 프로필 */}
      <section className="my-profile">
        {user ? (
          <>
            <p className="my-hello">
              <strong>{user.name}</strong>님, 반가워요!
            </p>
            <p className="my-email">{user.email}</p>
            <Link to="/coupon" className="my-coupon">
              <span>회원가입 축하 쿠폰</span>
              <strong>{couponCount ? '10% 할인' : '사용 완료'}</strong>
            </Link>
            <button type="button" className="my-logout" onClick={logout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <p className="my-hello">로그인하고 다양한 혜택을 받아보세요.</p>
            <p className="my-email">지금 가입하면 10% 할인 쿠폰을 드려요.</p>
            <div className="my-auth">
              <Link to="/login" className="btn btn--outline">
                로그인
              </Link>
              <Link to="/join" className="btn btn--primary has-tail-badge">
                회원가입
                <span className="tail-badge">10% 할인</span>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 요약 */}
      <ul className="my-stats">
        <li>
          <Link to="/cart">
            <strong>{count}</strong>
            <span>장바구니</span>
          </Link>
        </li>
        <li>
          <Link to="/recent">
            <strong>{recentCount}</strong>
            <span>최근 본 상품</span>
          </Link>
        </li>
        <li>
          <Link to="/coupon">
            <strong>{couponCount}</strong>
            <span>쿠폰</span>
          </Link>
        </li>
      </ul>

      {/* 메뉴 */}
      <ul className="my-menu">
        {MENUS.map((m) => (
          <li key={m.to}>
            <Link to={m.to}>{m.label}</Link>
          </li>
        ))}
        <li>
          <a href="tel:1661-6170">
            고객센터 <span>1661-6170</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default MyPage
