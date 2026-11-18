import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Best from './pages/Best.jsx'
import CareLine from './pages/CareLine.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import CategoryHome from './pages/CategoryHome.jsx'
import CategoryList from './pages/CategoryList.jsx'
import Cart from './pages/Cart.jsx'
import OrderComplete from './pages/OrderComplete.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import OrderFail from './pages/OrderFail.jsx'
import Recent from './pages/Recent.jsx'
import Coupons from './pages/Coupons.jsx'
import MyPage from './pages/MyPage.jsx'
import Join from './pages/Join.jsx'
import Login from './pages/Login.jsx'
import InfoPage from './pages/InfoPage.jsx'
import Search from './pages/Search.jsx'
import MagazineList from './pages/MagazineList.jsx'
import MagazineDetail from './pages/MagazineDetail.jsx'
import Event from './pages/Event.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      {/* Layout 안의 페이지들은 양쪽 고정 영역 · 헤더 · 푸터를 공유합니다 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* 상품 목록 */}
        <Route path="/best" element={<Best />} />
        {/* key: Daily ↔ Premium 이동 시 탭·정렬 상태를 초기화 */}
        <Route path="/daily" element={<CareLine key="daily" line="daily" />} />
        <Route path="/premium" element={<CareLine key="premium" line="premium" />} />
        <Route path="/category" element={<CategoryHome />} />
        <Route path="/category/:key" element={<CategoryList />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* 쇼핑 */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/complete" element={<OrderComplete />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/fail" element={<OrderFail />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/search" element={<Search />} />

        {/* 매거진 */}
        <Route path="/magazine" element={<MagazineList />} />
        <Route path="/magazine/:id" element={<MagazineDetail />} />

        {/* 이벤트 */}
        <Route path="/event" element={<Event />} />

        {/* 회원 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/coupon" element={<Coupons />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />

        {/* 안내 문서 */}
        <Route path="/guide" element={<InfoPage key="guide" doc="guide" />} />
        <Route path="/terms" element={<InfoPage key="terms" doc="terms" />} />
        <Route path="/privacy" element={<InfoPage key="privacy" doc="privacy" />} />

        {/* 없는 주소 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
