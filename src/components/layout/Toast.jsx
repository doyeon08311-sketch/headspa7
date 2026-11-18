import useCart from '../../cart/useCart.js'
import './Toast.css'

/* 화면 아래에 잠깐 떴다 사라지는 알림 (하단 메뉴바 위) */
function Toast() {
  const { toast } = useCart()

  return (
    <div className="toast-area" role="status" aria-live="polite">
      {toast && (
        <p key={toast.id} className="toast">
          {toast.message}
        </p>
      )}
    </div>
  )
}

export default Toast
