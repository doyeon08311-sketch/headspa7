/* 쿠폰 — 회원이면 누구나 회원가입 축하 쿠폰 1장 보유 (연습용 예시 조건)
   할인 규칙(rate · minAmount · maxDiscount)은 화면(장바구니)과 결제 승인 서버가 함께 씀
   → 서버가 같은 규칙으로 금액을 다시 계산해서 조작된 금액을 막음 */
export const WELCOME_COUPON = {
  id: 'welcome',
  name: '회원가입 축하 쿠폰',
  discount: '10%',
  rate: 10, // 할인율(%)
  minAmount: 30000, // 이 금액 이상 구매 시 사용 가능
  maxDiscount: 10000, // 최대 할인 금액
  summary: '30,000원 이상 구매 시 · 최대 10,000원 할인',
  period: '발급일로부터 30일',
  terms: [
    ['할인 혜택', '상품 금액의 10% 할인 (최대 10,000원)'],
    ['사용 조건', '30,000원 이상 구매 시 사용 가능 (배송비 제외)'],
    ['유효기간', '발급일로부터 30일'],
    ['사용 횟수', '1인 1회, 주문 1건에만 사용 가능'],
  ],
  notes: [
    '다른 할인 쿠폰과 함께 사용할 수 없어요.',
    '일부 세트 · 특가 상품에는 사용할 수 없어요.',
    '주문을 취소하거나 반품하면 유효기간 안에서 쿠폰이 다시 지급돼요.',
    '쿠폰은 현금으로 바꾸거나 다른 사람에게 줄 수 없어요.',
  ],
}

export const COUPONS = [WELCOME_COUPON]

export const findCoupon = (id) => COUPONS.find((c) => c.id === id) ?? null

/* 주문 금액 → 쿠폰 할인 금액 (조건 미달이면 0, 10원 단위 버림) */
export function calcCouponDiscount(coupon, amount) {
  if (!coupon || amount < coupon.minAmount) return 0
  const off = Math.floor((amount * coupon.rate) / 100 / 10) * 10
  return Math.min(off, coupon.maxDiscount)
}
