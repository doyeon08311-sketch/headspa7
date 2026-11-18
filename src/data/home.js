/* 메인 페이지에 쓰이는 데이터 (상품 정보는 products.json) */

/* 메인 배너 — 이미지 안에 문구가 들어 있어서 alt 로 같은 내용을 적어 둠 */
export const heroSlides = [
  { image: '/images/main/hero-01.png', alt: '피톤치드 두피 케어 샴푸 - 썬트리샴푸 롬브로단로' },
  { image: '/images/main/hero-02.png', alt: '올인원 7초 케어의 격을 높이다 - 더 프리미엄 트리트먼트' },
  { image: '/images/main/hero-03.png', alt: '가방은 가볍게 케어는 완벽하게 - 트래블 샤워 키트' },
  { image: '/images/main/hero-04.png', alt: '두피까지 케어완료 샴푸는 H7 - 시그니처 H7 클리닉 앰플 샴푸' },
  { image: '/images/main/hero-05.png', alt: '탈모엔 카밍 보습까지 완벽하게 - 시그니처 H7 카밍 앰플 샴푸' },
]

/* 카테고리 바로가기 */
export const categoryShortcuts = [
  { key: 'shampoo', label: '샴푸', image: '/images/main/category-shampoo.png' },
  { key: 'treatment', label: '트리트먼트', image: '/images/main/category-treatment.png' },
  { key: 'styling', label: '스타일링', image: '/images/main/category-styling.png' },
  { key: 'bodywash', label: '바디워시', image: '/images/main/category-body-wash.png' },
  { key: 'travel', label: '여행용', image: '/images/main/category-travel.png' },
]

/* 카테고리별 오늘의 추천 상품 탭 */
export const recommendTabs = [
  { key: 'shampoo', label: '샴푸', categories: ['shampoo'] },
  { key: 'treatment', label: '트리트먼트', categories: ['treatment'] },
  { key: 'styling', label: '스타일링', categories: ['styling'] },
  { key: 'etc', label: '기타', categories: ['bodywash', 'travel'] },
]

/* 예민한 두피를 위한 추천템 (상품 id) */
export const sensitivePickIds = [23, 26, 15, 12, 6, 31]

/* 리얼 후기 — 각 상품의 첫 번째 후기를 보여줌 (후기 내용은 products.json 의 reviews)
   photo: 카드 위쪽 후기 사진 */
export const reviewItems = [
  { productId: 3, photo: '/images/main/review_01.png' },
  { productId: 22, photo: '/images/main/review_02.png' },
  { productId: 9, photo: '/images/main/review_03.png' },
  { productId: 10, photo: '/images/main/review_04.png' },
  { productId: 29, photo: '/images/main/review_05.png' },
  { productId: 21, photo: '/images/main/review_06.png' },
]
