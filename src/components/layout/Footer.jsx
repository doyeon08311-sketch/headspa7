import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <address className="footer-info">
        <p>회사명(상호): 주식회사피알앤 | 대표자: 정지영</p>
        <p>사업자등록번호: 348-88-00782</p>
        <p>주소: 서울특별시 강남구 선릉로112길 84 (삼성동) 오션빌딩 (06096)</p>
        <p>통신판매신고: 2022-서울강남-02390 [사업자정보확인]</p>
        <p>개인정보보호책임자: 박경조 | 대표메일: prn@headspa7.com</p>
      </address>

      <div className="footer-bottom">
        <a href="tel:1661-6170" className="footer-tel">1661-6170</a>
        <img className="footer-logo" src="/images/common/logo-white.png" alt="HEADSPA7" />
      </div>

      <ul className="footer-links">
        <li><span>이용약관</span></li>
        <li><span>개인정보처리방침</span></li>
        <li><span>이용안내</span></li>
      </ul>
    </footer>
  )
}

export default Footer
