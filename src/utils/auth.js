/* 로그인 · 회원가입 · 로그아웃
   - Firebase 설정이 있으면: Firebase Authentication (이메일/비밀번호 + Google)
   - 없으면: 연습용 (이 브라우저에만 저장, 비밀번호 확인 안 함)
   - 어느 쪽이든 로그인한 회원은 storage.js 의 getUser() 로 읽음
     (Firebase 로그인 상태가 바뀌면 syncAuthState 가 자동으로 맞춰 줌) */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, firebaseReady } from '../lib/firebase.js'
import { addMember, clearUser, findMember, saveUser } from './storage.js'

export { firebaseReady }

/* Firebase 오류 → 안내 문구 */
const MESSAGES = {
  'auth/email-already-in-use': '이미 가입된 이메일이에요. 로그인해 주세요.',
  'auth/invalid-email': '이메일 형식을 확인해 주세요.',
  'auth/weak-password': '비밀번호를 더 길게 만들어 주세요.',
  'auth/invalid-credential': '이메일 또는 비밀번호가 맞지 않아요.',
  'auth/wrong-password': '이메일 또는 비밀번호가 맞지 않아요.',
  'auth/user-not-found': '가입된 이메일이 아니에요. 회원가입을 해 주세요.',
  'auth/too-many-requests': '로그인 시도가 너무 많아요. 잠시 후 다시 시도해 주세요.',
  'auth/network-request-failed': '인터넷 연결을 확인해 주세요.',
  'auth/popup-blocked': '팝업이 차단되었어요. 브라우저에서 팝업을 허용해 주세요.',
  'auth/account-exists-with-different-credential': '같은 이메일로 가입한 다른 로그인 방법이 있어요. 그 방법으로 로그인해 주세요.',
}

/* 사용자가 팝업을 직접 닫은 경우 (오류 문구를 띄우지 않음) */
export const isCancelled = (err) =>
  ['auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/user-cancelled'].includes(err?.code)

export const authErrorMessage = (err) => MESSAGES[err?.code] ?? '잠시 후 다시 시도해 주세요.'

/* 연습용 오류 (Firebase 와 같은 모양으로) */
const practiceError = (code) => Object.assign(new Error(code), { code })

/* Firebase 회원 → 사이트에서 쓰는 회원 정보
   (휴대폰 · 수신 동의처럼 Firebase 에 없는 정보는 이 브라우저의 회원 목록에서 이어 붙임) */
function toSiteUser(fbUser) {
  const extra = findMember(fbUser.email) ?? {}
  return {
    ...extra,
    uid: fbUser.uid,
    name: fbUser.displayName || extra.name || fbUser.email.split('@')[0],
    email: fbUser.email,
    picture: fbUser.photoURL || undefined,
    google: fbUser.providerData.some((p) => p.providerId === 'google.com'),
  }
}

/* 앱 시작 시 한 번: Firebase 로그인 상태가 바뀔 때마다 getUser() 값을 맞춤 */
export function syncAuthState() {
  if (!firebaseReady) return
  onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) saveUser(toSiteUser(fbUser))
    else clearUser()
  })
}

/* 이메일 회원가입 → 가입 후 바로 로그인 상태 */
export async function signUpWithEmail({ name, email, password, phone, marketing }) {
  const extra = { name, email, phone, marketing }

  if (!firebaseReady) {
    if (findMember(email)) throw practiceError('auth/email-already-in-use')
    addMember(extra)
    saveUser(extra)
    return extra
  }

  // 휴대폰 · 수신 동의는 이 브라우저에 보관 (가입 직후 로그인 상태가 바뀌기 전에 넣어 둬야 이름이 바로 보임)
  addMember(extra)
  const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(fbUser, { displayName: name })
  const user = toSiteUser(fbUser)
  saveUser(user)
  return user
}

/* 이메일 로그인 */
export async function signInWithEmail(email, password) {
  if (!firebaseReady) {
    const member = findMember(email)
    if (!member) throw practiceError('auth/user-not-found')
    saveUser(member)
    return member
  }

  const { user: fbUser } = await signInWithEmailAndPassword(auth, email, password)
  const user = toSiteUser(fbUser)
  saveUser(user)
  return user
}

/* Google 로그인 (팝업) — 처음이면 자동 가입. 반환값: { user, isNew } */
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, new GoogleAuthProvider())
  const user = toSiteUser(result.user)
  saveUser(user)
  return { user, isNew: !!getAdditionalUserInfo(result)?.isNewUser }
}

/* 로그아웃 */
export async function logOut() {
  clearUser()
  if (firebaseReady) await signOut(auth)
}
