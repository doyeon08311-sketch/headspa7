import products from '../data/products.json'

export { products }

/* 42000 → "42,000원" */
export function formatPrice(value) {
  return `${value.toLocaleString('ko-KR')}원`
}

/* 할인율(%) — 할인이 없으면 0 */
export function getDiscountRate(product) {
  if (!product.price || product.salePrice >= product.price) return 0
  return Math.round(((product.price - product.salePrice) / product.price) * 100)
}

/* 상품 태그 (최대 2개)
   - 베스트: 순위(rank)가 있는 상품
   - 무료배송: 전 상품
   - 주목상품: 프리미엄 라인 */
export function getTags(product) {
  const tags = []
  if (product.rank) tags.push('베스트')
  tags.push('무료배송')
  if (product.line === 'premium') tags.push('주목상품')
  return tags.slice(0, 2)
}

/* 효능 해시태그 (최대 3개, 띄어쓰기 제거)
   - 여행용 세트는 features 에 구성품이 들어 있어서 따로 지정 */
export function getHashtags(product) {
  const words = product.category === 'travel' ? ['여행용', '미니사이즈', '방수파우치'] : product.features
  return words.slice(0, 3).map((word) => `#${word.replace(/\s+/g, '')}`)
}

/* 카테고리 이름 (탭 순서도 이 순서) */
export const CATEGORY_LABELS = {
  shampoo: '샴푸',
  treatment: '트리트먼트',
  styling: '스타일링',
  bodywash: '바디워시',
  travel: '여행용',
}

/* 정렬 방식 */
export const SORT_OPTIONS = [
  { key: 'recommend', label: '추천순' },
  { key: 'priceLow', label: '낮은 가격순' },
  { key: 'priceHigh', label: '높은 가격순' },
  { key: 'discount', label: '할인율순' },
]

/* 정렬 — 원본 배열은 건드리지 않고 새 배열을 돌려줌
   추천순: 순위가 있는 상품 먼저(순위 높은 순), 나머지는 등록 순 */
export function sortProducts(list, sortKey) {
  const sorted = [...list]
  switch (sortKey) {
    case 'priceLow':
      return sorted.sort((a, b) => a.salePrice - b.salePrice)
    case 'priceHigh':
      return sorted.sort((a, b) => b.salePrice - a.salePrice)
    case 'discount':
      return sorted.sort((a, b) => getDiscountRate(b) - getDiscountRate(a))
    default:
      return sorted.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999) || a.id - b.id)
  }
}

/* id 목록 순서대로 상품 찾기 */
export function getProductsByIds(ids) {
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean)
}
