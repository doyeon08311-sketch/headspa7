import { NavLink } from 'react-router-dom'
import './BottomNav.css'

const ICONS = {
  home: <path d="M4 11 13 3.5l9 7.5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />,
  category: (
    <>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" />
      <rect x="15" y="3.5" width="7.5" height="7.5" />
      <rect x="3.5" y="15" width="7.5" height="7.5" />
      <rect x="15" y="15" width="7.5" height="7.5" />
    </>
  ),
  recent: (
    <>
      <circle cx="13" cy="13" r="9.5" />
      <path d="M13 7.5V13l3.5 3" />
    </>
  ),
  mypage: (
    <>
      <circle cx="13" cy="8.5" r="4.5" />
      <path d="M4 23c0-4.5 4-7.5 9-7.5s9 3 9 7.5" />
    </>
  ),
}

const MENUS = [
  { to: '/', label: '홈', icon: 'home' },
  { to: '/category', label: '카테고리', icon: 'category' },
  { to: '/recent', label: '최근 본 상품', icon: 'recent' },
  { to: '/mypage', label: '마이페이지', icon: 'mypage' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {MENUS.map((menu) => (
        // '홈'만 정확히 일치할 때 활성, 나머지는 하위 주소(/category/shampoo 등)에서도 활성
        <NavLink key={menu.to} to={menu.to} end={menu.to === '/'}>
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONS[menu.icon]}
          </svg>
          {menu.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
