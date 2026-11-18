import { useCallback, useEffect, useRef, useState } from 'react'
import { CartContext } from './cartContext.js'

const STORAGE_KEY = 'headspa7-cart'
const MAX_QTY = 99

/* 브라우저에 저장된 장바구니 불러오기 (막혀 있거나 비어 있으면 빈 장바구니) */
function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

/* 장바구니 상태 + 알림 메시지
   items: [{ id: 상품 id, qty: 수량 }] */
function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)
  const [toast, setToast] = useState(null) // { id, message }
  const toastTimer = useRef(null)

  // 바뀔 때마다 브라우저에 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* 저장이 막힌 환경(시크릿 모드 등)에서는 저장 없이 동작 */
    }
  }, [items])

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message })
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }, [])

  /* 담기 — 이미 있으면 수량만 늘림 */
  const addItem = useCallback(
    (product, qty = 1) => {
      const already = items.find((item) => item.id === product.id)
      setItems((prev) =>
        prev.some((item) => item.id === product.id)
          ? prev.map((item) => (item.id === product.id ? { ...item, qty: Math.min(item.qty + qty, MAX_QTY) } : item))
          : [...prev, { id: product.id, qty }],
      )
      if (already) showToast(`이미 담긴 상품이라 수량을 ${Math.min(already.qty + qty, MAX_QTY)}개로 늘렸어요.`)
      else showToast(qty > 1 ? `장바구니에 ${qty}개 담았어요.` : '장바구니에 담았어요.')
    },
    [items, showToast],
  )

  /* 수량 변경 (1 ~ 99) */
  const updateQty = useCallback((id, qty) => {
    const next = Math.max(1, Math.min(qty, MAX_QTY))
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: next } : item)))
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <CartContext.Provider value={{ items, count, addItem, updateQty, removeItem, clearCart, showToast, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
