import './Stars.css'

/* 별점 ★★★★☆ — rating: 0~5 (소수점은 반올림) */
function Stars({ rating, size = 14 }) {
  const filled = Math.round(rating)
  return (
    <span className="stars" style={{ fontSize: size }} aria-label={`별점 5점 중 ${rating}점`}>
      {'★'.repeat(filled)}
      <span className="stars-empty">{'★'.repeat(5 - filled)}</span>
    </span>
  )
}

export default Stars
