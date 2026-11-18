import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* 페이지(주소)가 바뀌면 맨 위에서 시작 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
