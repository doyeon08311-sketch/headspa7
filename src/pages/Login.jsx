import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../utils/storage.js'
import { authErrorMessage, firebaseReady, signInWithEmail } from '../utils/auth.js'
import useCart from '../cart/useCart.js'
import GoogleLoginButton from '../components/common/GoogleLoginButton.jsx'
import './ListPage.css'
import './SubPage.css'

/* 로그인 — 이메일/비밀번호 또는 Google
   - Firebase 설정이 있으면 Firebase 로 실제 확인
   - 없으면 연습용 (이 브라우저에서 가입한 이메일이면 로그인, 비밀번호 확인 안 함) */
function Login() {
  const navigate = useNavigate()
  const from = useLocation().state?.from // 주문하다가 왔으면 로그인 후 그 페이지로
  const goNext = () => navigate(from ?? '/mypage', { replace: !!from })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const already = getUser()
  const { showToast } = useCart()

  // Google 로그인 완료 → 원래 페이지(없으면 마이페이지)
  const onGoogle = ({ user, isNew }) => {
    showToast(isNew ? `${user.name}님, Google 계정으로 가입되었어요.` : `${user.name}님, 반가워요!`)
    goNext()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const user = await signInWithEmail(email.trim(), password)
      showToast(`${user.name}님, 반가워요!`)
      goNext()
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">LOGIN</p>
        <h1 className="t-promo">로그인</h1>
        <p className="page-head-desc">
          {already
            ? `${already.name}님으로 로그인되어 있어요.`
            : from
              ? '로그인하면 바로 주문을 이어서 할 수 있어요.'
              : '헤드스파7 회원 혜택을 만나 보세요.'}
        </p>
      </header>

      <form className="join-form" onSubmit={onSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">이메일</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@headspa7.com"
            autoComplete="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="login-password">비밀번호</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
          {loading ? '로그인 중…' : '로그인'}
        </button>

        <p className="social-divider">또는</p>
        <GoogleLoginButton
          onSuccess={onGoogle}
          onError={setError}
          onUnavailable={() => showToast('Google 로그인은 준비 중이에요.')}
        />

        <p className="login-join">
          아직 회원이 아니신가요? <Link to="/join" state={{ from }}>회원가입하고 10% 쿠폰 받기</Link>
        </p>
        {!firebaseReady && <p className="cart-note">연습용 쇼핑몰이라 비밀번호는 확인하지 않아요.</p>}
      </form>
    </div>
  )
}

export default Login
