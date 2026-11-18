/* Firebase 연결
   - 설정값은 .env.local 에서 읽음 (.env.example 참고)
   - 값이 비어 있으면 firebaseReady = false → 사이트는 연습용 로그인으로 동작 */
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
}

export const firebaseReady = Object.values(config).every(Boolean)

export const auth = firebaseReady ? getAuth(initializeApp(config)) : null

if (auth) auth.languageCode = 'ko' // Google 로그인 팝업 등 한국어로
