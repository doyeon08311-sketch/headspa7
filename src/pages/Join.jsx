import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUser, findMember } from '../utils/storage.js'
import { authErrorMessage, firebaseReady, signUpWithEmail } from '../utils/auth.js'
import useCart from '../cart/useCart.js'
import GoogleLoginButton from '../components/common/GoogleLoginButton.jsx'
import './ListPage.css'
import './SubPage.css'

const AGREEMENTS = [
  { key: 'terms', label: '[필수] 이용약관 동의', required: true, link: '/terms' },
  { key: 'privacy', label: '[필수] 개인정보 수집·이용 동의', required: true, link: '/privacy' },
  { key: 'marketing', label: '[선택] 쇼핑 정보 수신 동의', required: false },
]

/* 입력값 검사 — 문제가 있는 칸만 메시지를 돌려줌 */
function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = '이름을 입력해 주세요.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = '이메일 형식을 확인해 주세요.'
  else if (!firebaseReady && findMember(form.email)) errors.email = '이미 가입된 이메일이에요. 로그인해 주세요.'
  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.password)) errors.password = '영문과 숫자를 섞어 8자 이상 입력해 주세요.'
  if (form.password !== form.passwordCheck) errors.passwordCheck = '비밀번호가 일치하지 않아요.'
  if (!/^01\d{8,9}$/.test(form.phone.replace(/-/g, ''))) errors.phone = '휴대폰 번호를 확인해 주세요.'
  if (AGREEMENTS.some((a) => a.required && !form.agree[a.key])) errors.agree = '필수 약관에 동의해 주세요.'
  return errors
}

const EMPTY = { name: '', email: '', password: '', passwordCheck: '', phone: '', agree: {} }

/* 회원가입 — 이메일/비밀번호 또는 Google
   - Firebase 설정이 있으면 Firebase 에 실제 가입 (비밀번호는 Firebase 가 안전하게 보관)
   - 없으면 연습용 (이름·이메일만 이 브라우저에 저장, 비밀번호는 저장하지 않음) */
function Join() {
  const navigate = useNavigate()
  const { showToast } = useCart()
  const from = useLocation().state?.from // 주문하다가 왔으면 가입 후 그 페이지로
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(() => getUser())
  const [loading, setLoading] = useState(false)

  // Google로 계속하기: 처음이면 가입 완료 화면, 이미 회원이면 바로 마이페이지
  const onGoogle = ({ user, isNew }) => {
    if (isNew) {
      setDone(user)
      return
    }
    showToast(`${user.name}님, 이미 가입된 계정이라 로그인했어요.`)
    navigate(from ?? '/mypage', { replace: !!from })
  }

  const set = (field) => (e) => {
    const next = { ...form, [field]: e.target.value }
    setForm(next)
    if (submitted) setErrors(validate(next))
  }

  const allAgreed = AGREEMENTS.every((a) => form.agree[a.key])
  const toggleAgree = (key) => {
    const agree = key === 'all' ? Object.fromEntries(AGREEMENTS.map((a) => [a.key, !allAgreed])) : { ...form.agree, [key]: !form.agree[key] }
    const next = { ...form, agree }
    setForm(next)
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    setLoading(true)
    try {
      const user = await signUpWithEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.replace(/-/g, ''),
        marketing: !!form.agree.marketing,
      })
      setDone(user) // 가입하면 바로 로그인 상태
    } catch (err) {
      // 이미 가입된 이메일 · 이메일 형식 오류는 이메일 칸 아래에, 나머지는 버튼 위에
      const key = /email/.test(err.code) ? 'email' : 'submit'
      setErrors({ [key]: authErrorMessage(err) })
    } finally {
      setLoading(false)
    }
  }

  // 가입 완료 (또는 이미 가입됨)
  if (done) {
    return (
      <div className="list-page complete">
        <div className="complete-icon" aria-hidden="true">
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 13l10 10L32 3" />
          </svg>
        </div>
        <h1 className="t-promo">{done.name}님, 환영해요!</h1>
        <p className="complete-desc">회원가입 축하 10% 할인 쿠폰이 지급되었어요.</p>
        <div className="complete-buttons">
          <Link to="/mypage" className="btn btn--outline">
            마이페이지
          </Link>
          {from ? (
            <Link to={from} replace className="btn btn--primary">
              주문 계속하기
            </Link>
          ) : (
            <Link to="/best" className="btn btn--primary">
              쇼핑하러 가기
            </Link>
          )}
        </div>
      </div>
    )
  }

  const field = (key, label, type = 'text', placeholder = '', autoComplete) => (
    <div className="form-field">
      <label htmlFor={`join-${key}`}>{label}</label>
      <input
        id={`join-${key}`}
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `join-${key}-error` : undefined}
      />
      {errors[key] && (
        <p className="form-error" id={`join-${key}-error`}>
          {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="t-eyebrow page-head-eyebrow">JOIN</p>
        <h1 className="t-promo">회원가입</h1>
        <p className="page-head-desc">가입하면 바로 쓸 수 있는 10% 할인 쿠폰을 드려요.</p>
      </header>

      <form className="join-form" onSubmit={onSubmit} noValidate>
        {field('name', '이름', 'text', '이름', 'name')}
        {field('email', '이메일', 'email', 'example@headspa7.com', 'email')}
        {field('password', '비밀번호', 'password', '영문, 숫자 포함 8자 이상', 'new-password')}
        {field('passwordCheck', '비밀번호 확인', 'password', '비밀번호를 한 번 더 입력', 'new-password')}
        {field('phone', '휴대폰 번호', 'tel', '01012345678', 'tel')}

        <fieldset className="join-agree">
          <legend className="visually-hidden">약관 동의</legend>
          <label className="join-agree-all">
            <input type="checkbox" checked={allAgreed} onChange={() => toggleAgree('all')} />
            <span>전체 동의</span>
          </label>
          {AGREEMENTS.map((a) => (
            <div key={a.key} className="join-agree-item">
              <label>
                <input type="checkbox" checked={!!form.agree[a.key]} onChange={() => toggleAgree(a.key)} />
                <span>{a.label}</span>
              </label>
              {a.link && (
                <Link to={a.link} target="_blank">
                  보기
                </Link>
              )}
            </div>
          ))}
          {errors.agree && <p className="form-error">{errors.agree}</p>}
        </fieldset>

        {errors.submit && (
          <p className="form-error" role="alert">
            {errors.submit}
          </p>
        )}
        <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
          {loading ? '가입하는 중…' : '가입하기'}
        </button>

        <p className="social-divider">또는</p>
        <GoogleLoginButton
          onSuccess={onGoogle}
          onError={showToast}
          onUnavailable={() => showToast('Google 로그인은 준비 중이에요.')}
        />
        <p className="login-join">
          이미 회원이신가요? <Link to="/login" state={{ from }}>로그인</Link>
        </p>
        {!firebaseReady && <p className="cart-note">연습용 쇼핑몰이라 비밀번호는 저장되지 않아요.</p>}
      </form>
    </div>
  )
}

export default Join
