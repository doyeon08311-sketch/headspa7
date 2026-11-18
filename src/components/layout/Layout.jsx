import { Outlet } from 'react-router-dom'
import SideLeft from './SideLeft.jsx'
import SideRight from './SideRight.jsx'
import QuickMenu from './QuickMenu.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BottomNav from './BottomNav.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import Toast from './Toast.jsx'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <ScrollToTop />
      <SideLeft />

      {/* 가운데 영역: 페이지마다 내용만 바뀌고, 스크롤은 여기만 내려갑니다 */}
      <div className="layout-center">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <BottomNav />
        <Toast />
      </div>

      <SideRight />
      <QuickMenu />
    </div>
  )
}

export default Layout
