import { useState } from 'react'
import Modal from '../common/Modal.jsx'

/* SNS · TOP 버튼
   - 넓은 화면: 오른쪽 영역, 가운데 영역 가장자리 근처
   - 좁은 화면: 가운데 영역 오른쪽 아래 */
function QuickMenu() {
  const [kakaoOpen, setKakaoOpen] = useState(false)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <div className="quick-menu">
        <a href="https://www.instagram.com/headspa7_official" target="_blank" rel="noopener noreferrer" aria-label="헤드스파7 인스타그램 (새 창)">
          <img src="/images/common/insta.png" alt="" />
        </a>
        <button type="button" className="quick-menu-sns" aria-label="카카오톡 채널" aria-haspopup="dialog" onClick={() => setKakaoOpen(true)}>
          <img src="/images/common/kakaoch.png" alt="" />
        </button>
        <button type="button" className="quick-menu-top" onClick={scrollToTop}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 10 10 2l8 8" />
          </svg>
          TOP
        </button>
      </div>

      <Modal open={kakaoOpen} icon="info" title="이 기능은 시연용입니다" onClose={() => setKakaoOpen(false)}>
        <p>본 사이트는 헤드스파7 브랜드를 앱·웹 겸용 일체형 구조로 리뉴얼한 개인 포트폴리오 작업입니다.</p>
        <p>카카오톡 채널 버튼은 실제 서비스 흐름을 보여주기 위한 UI이며, 외부로 연결되지 않습니다.</p>
      </Modal>
    </>
  )
}

export default QuickMenu
