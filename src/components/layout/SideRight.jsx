import { Link } from 'react-router-dom'

function Sparkle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M5 19l2.5-2.5M16.5 7.5 19 5" />
    </svg>
  )
}

function SideRight() {
  return (
    <aside className="side side-right">
      {/* 이벤트 카드 */}
      <div className="side-event">
        <h2 className="side-event-title">
          <Sparkle />
          EVENT
          <Sparkle />
        </h2>

        <Link className="side-event-card" to="/event">
          <div className="side-event-visual">
            <img src="/images/main/outside-right-2.png" alt="" />
            <p className="side-event-text">
              헤드스파7
              <strong>7주년 이벤트</strong>
            </p>
          </div>
          <span className="side-event-more">이벤트 내용 자세히 보기</span>
        </Link>
      </div>
    </aside>
  )
}

export default SideRight
