import { Link } from 'react-router-dom'

function PromoBanners() {
  return (
    <section className="home-section promo">
      <Link to="/join" className="promo-banner promo-banner--coupon">
        <strong className="t-promo">회원가입 시 10% 할인 쿠폰 이벤트</strong>
        <span>헤드스파7의 가족이 되어주세요.</span>
      </Link>
      <a href="#none" className="promo-banner promo-banner--kakao">
        <strong className="t-promo">카카오 플러스 친구 스페셜 혜택</strong>
        <span>친구 추가 시 적립금 5천원 증정.</span>
      </a>
    </section>
  )
}

export default PromoBanners
