import { Link } from 'react-router-dom'

/* 내용이 없을 때 안내 (장바구니 비었음, 최근 본 상품 없음 등) */
function EmptyState({ title, desc, linkTo = '/best', linkLabel = '베스트 상품 보러 가기' }) {
  return (
    <div className="empty-state">
      <p className="t-section">{title}</p>
      {desc && <p className="empty-state-desc">{desc}</p>}
      <Link to={linkTo} className="btn btn--primary">
        {linkLabel}
      </Link>
    </div>
  )
}

export default EmptyState
