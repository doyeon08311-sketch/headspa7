/* 페이지 상단 배너 (580 × 270 비율) — 베스트 · Daily Care · Premium Care 공통
   - src 가 없으면 회색 자리표시
   - 권장 이미지 크기: 1160 × 540px (화면 580 × 270 의 2배) */
function PageBanner({ name, src }) {
  return (
    <header className="line-banner">
      <h1 className="visually-hidden">{name}</h1>
      {src ? <img src={src} alt={`${name} 배너`} /> : <div className="line-banner-placeholder">배너 이미지 자리 (580 × 270)</div>}
    </header>
  )
}

export default PageBanner
