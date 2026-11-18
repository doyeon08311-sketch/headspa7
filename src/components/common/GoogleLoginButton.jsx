import { useState } from 'react'
import { authErrorMessage, firebaseReady, isCancelled, signInWithGoogle } from '../../utils/auth.js'
import './GoogleLoginButton.css'

/* Google G 로고 (Google 로그인 버튼 공식 색상) */
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/* Google로 계속하기 버튼 (로그인 버튼과 같은 크기)
   - Firebase 설정이 있으면: 누르면 Google 로그인 팝업
   - 아직 없으면: onUnavailable 호출
   - onSuccess({ user, isNew }) : 로그인 · 가입 완료 후 호출 */
function GoogleLoginButton({ onSuccess, onError, onUnavailable }) {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    if (!firebaseReady) {
      onUnavailable?.()
      return
    }
    setLoading(true)
    try {
      onSuccess?.(await signInWithGoogle())
    } catch (err) {
      if (!isCancelled(err)) onError?.(authErrorMessage(err)) // 팝업을 그냥 닫은 경우는 조용히
    } finally {
      setLoading(false)
    }
  }

  return (
    <button type="button" className="btn btn--block google-btn" onClick={onClick} disabled={loading}>
      <GoogleLogo />
      {loading ? 'Google 계정 확인 중…' : 'Google로 계속하기'}
    </button>
  )
}

export default GoogleLoginButton
