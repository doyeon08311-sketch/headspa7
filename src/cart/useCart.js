import { useContext } from 'react'
import { CartContext } from './cartContext.js'

/* 어느 컴포넌트에서든 장바구니 사용: const { count, addItem } = useCart() */
export default function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart 는 CartProvider 안에서만 쓸 수 있어요.')
  return cart
}
