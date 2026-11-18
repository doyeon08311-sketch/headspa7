import { SORT_OPTIONS } from '../../utils/product.js'

/* 목록 위: 상품 개수 + 정렬 선택 */
function SortBar({ count, sort, onChange }) {
  return (
    <div className="sort-bar">
      <p>
        총 <strong>{count}</strong>개
      </p>
      <label className="sort-select">
        <span className="visually-hidden">정렬</span>
        <select value={sort} onChange={(e) => onChange(e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SortBar
