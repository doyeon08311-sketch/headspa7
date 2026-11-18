import { Link } from 'react-router-dom'
import { eventInfo, INSTAGRAM_URL } from '../data/event.js'
import { getProductsByIds } from '../utils/product.js'
import Emoji from '../components/common/Emoji.jsx'
import './Event.css'

const gifts = getProductsByIds(eventInfo.giftProductIds)

/* 7주년 이벤트 안내 */
function Event() {
  const { intro, steps, stepTip, giftTitle, giftCount, giftNames, schedule, notices } = eventInfo

  return (
    <article className="event">
      {/* 상단: 아치형 이미지 + 제목 */}
      <header className="event-hero">
        <p className="event-eyebrow">7th ANNIVERSARY EVENT</p>
        <h1 className="event-title">
          헤드스파7
          <strong>7주년 인스타그램 이벤트</strong>
        </h1>
        <div className="event-arch">
          <img src={eventInfo.image} alt="헤드스파7 7주년 케이크와 트리트먼트 제품" />
        </div>
      </header>

      {/* 인사말 */}
      <div className="event-intro">
        {intro.map((line, i) => (
          <p key={line}>
            {line}
            {i === intro.length - 1 && <> <Emoji name="raisingHands" /></>}
          </p>
        ))}
      </div>

      {/* 참여 방법 */}
      <section className="event-section">
        <h2 className="event-heading">
          <Emoji name="ballot" /> 이벤트 참여 방법
        </h2>
        <ol className="event-steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="event-step-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="event-tip">♥ {stepTip} ♥</p>
      </section>

      {/* 당첨 선물 */}
      <section className="event-section">
        <h2 className="event-heading">
          <Emoji name="gift" /> 당첨 선물
        </h2>
        <p className="event-gift-title">
          {giftTitle}
          <span className="event-gift-count">{giftCount}</span>
        </p>
        <ul className="event-gifts">
          {gifts.map((product, i) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`} className="event-gift">
                <div className="event-gift-thumb">
                  <img src={product.image} alt="" loading="lazy" />
                </div>
                <span>{giftNames[i] ?? product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 이벤트 기간 */}
      <section className="event-section">
        <h2 className="event-heading">
          <Emoji name="megaphone" /> 이벤트 기간
        </h2>
        <dl className="event-schedule">
          {schedule.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>
                {row.value}
                {row.note && <span>{row.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 참여 버튼 */}
      <div className="event-cta">
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--block">
          인스타그램에서 참여하기
          <span className="visually-hidden">(새 창)</span>
        </a>
      </div>

      {/* 유의사항 */}
      <section className="event-notice">
        <h2>
          <Emoji name="pushpin" /> 유의사항
        </h2>
        <ul>
          {notices.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default Event
