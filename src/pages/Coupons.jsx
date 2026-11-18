import { useState } from 'react'
import { getUser } from '../utils/storage.js'
import { getMyCoupons } from '../utils/coupon.js'
import EmptyState from '../components/common/EmptyState.jsx'
import Emoji from '../components/common/Emoji.jsx'
import Modal from '../components/common/Modal.jsx'
import './ListPage.css'
import './SubPage.css'

/* 쿠폰함 — 쿠폰을 누르면 이용 조건이 모달로 열림 */
function Coupons() {
  const coupons = getMyCoupons(getUser())
  const availableCount = coupons.filter((c) => !c.used).length
  const [opened, setOpened] = useState(null)

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">COUPON</p>
        <h1 className="t-promo">쿠폰함</h1>
      </header>

      {coupons.length === 0 ? (
        <EmptyState
          title="로그인하면 쿠폰을 볼 수 있어요."
          desc="지금 가입하면 10% 할인 쿠폰을 바로 드려요."
          linkTo="/login"
          linkLabel="로그인하러 가기"
        />
      ) : (
        <>
          <div className="cart-toolbar">
            <p>
              사용 가능한 쿠폰 <strong>{availableCount}</strong>장
            </p>
          </div>
          <ul className="coupon-list">
            {coupons.map((c) => (
              <li key={c.id}>
                <button type="button" className={`coupon-card${c.used ? ' is-used' : ''}`} onClick={() => setOpened(c)}>
                  {c.used && <span className="coupon-card-badge">사용 완료</span>}
                  <span className="coupon-card-value">
                    <small>COUPON</small>
                    {c.discount}
                    <small>OFF</small>
                  </span>
                  <span className="coupon-card-info">
                    <strong>
                      <Emoji name="gift" /> {c.name}
                    </strong>
                    <span>{c.summary}</span>
                    <span className="coupon-card-period">유효기간 {c.period}</span>
                  </span>
                  <span className="coupon-card-more">조건 보기</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <Modal open={!!opened} icon="gift" title={opened?.name} onClose={() => setOpened(null)}>
        {opened && (
          <div className="coupon-terms">
            <dl>
              {opened.terms.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <ul>
              {opened.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Coupons
