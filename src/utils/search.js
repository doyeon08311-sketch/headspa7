import { products, CATEGORY_LABELS, sortProducts } from './product.js'
import { SEARCH_KEYWORDS } from '../data/search.js'

const LINE_LABELS = { daily: 'Daily Care 데일리', premium: 'Premium Care 프리미엄' }

/* 띄어쓰기 · 가운뎃점을 없애고 소문자로 ("수분·영양 공급" → "수분영양공급") */
const normalize = (text) => text.replace(/[\s·]/g, '').toLowerCase()

/* 상품마다 검색 대상 글자를 미리 합쳐 둠: 상품명 + 특징 + 카테고리 + 라인 */
const index = products.map((p) => ({
  product: p,
  text: normalize([p.name, ...p.features, CATEGORY_LABELS[p.category], LINE_LABELS[p.line]].join(' ')),
}))

/* 검색 — 검색어(띄어쓰기로 나눈 각 단어)가 모두 들어 있는 상품
   추천 키워드(예: 탈모완화)는 연결된 단어(탈모) 중 하나라도 들어 있으면 찾음 */
export function searchProducts(query) {
  const q = query.trim()
  if (!q) return []

  const keyword = SEARCH_KEYWORDS.find((k) => normalize(k.label) === normalize(q))
  const matched = keyword
    ? index.filter(({ text }) => [keyword.label, ...keyword.terms].some((t) => text.includes(normalize(t))))
    : index.filter(({ text }) => q.split(/\s+/).every((word) => text.includes(normalize(word))))

  return sortProducts(
    matched.map((m) => m.product),
    'recommend',
  )
}
