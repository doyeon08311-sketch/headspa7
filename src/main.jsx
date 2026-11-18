import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './cart/CartProvider.jsx'
import { syncAuthState } from './utils/auth.js'
import './index.css'
import App from './App.jsx'

// Firebase 로그인 상태를 사이트 회원 정보와 맞춤 (설정이 없으면 아무 일도 안 함)
syncAuthState()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
