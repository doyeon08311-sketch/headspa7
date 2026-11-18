import HeroSlider from '../components/home/HeroSlider.jsx'
import CategoryShortcut from '../components/home/CategoryShortcut.jsx'
import PopularProducts from '../components/home/PopularProducts.jsx'
import PromoBanners from '../components/home/PromoBanners.jsx'
import CategoryRecommend from '../components/home/CategoryRecommend.jsx'
import Magazine from '../components/home/Magazine.jsx'
import SensitivePicks from '../components/home/SensitivePicks.jsx'
import Reviews from '../components/home/Reviews.jsx'
import './Home.css'

function Home() {
  return (
    <>
      <HeroSlider />
      <CategoryShortcut />
      <PopularProducts />
      <PromoBanners />
      <CategoryRecommend />
      <Magazine />
      <SensitivePicks />
      <Reviews />
    </>
  )
}

export default Home
