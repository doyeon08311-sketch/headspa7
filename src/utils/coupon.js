/* 회원의 쿠폰함 — 비회원은 쿠폰 없음, 회원은 모든 쿠폰 + 사용 여부 */
import { COUPONS } from '../data/coupons.js'
import { getUsedCoupons } from './storage.js'

export function getMyCoupons(user) {
  if (!user) return []
  const used = getUsedCoupons(user.email)
  return COUPONS.map((c) => ({ ...c, used: used.includes(c.id) }))
}

/* 지금 쓸 수 있는 쿠폰 (없으면 null) */
export const getAvailableCoupon = (user) => getMyCoupons(user).find((c) => !c.used) ?? null
