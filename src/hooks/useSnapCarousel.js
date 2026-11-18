import { useEffect, useRef, useState } from 'react'
import useDragScroll from './useDragScroll.js'

/* 가로 스크롤 슬라이드 (scroll-snap)
   - 손가락으로 넘기기는 브라우저 기본 스크롤로 처리
   - autoplay(ms) 를 주면 자동으로 넘어감 */
export default function useSnapCarousel(count, autoplay = 0) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  useDragScroll(trackRef) // PC 마우스로 끌어서 넘기기

  const goTo = (i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  useEffect(() => {
    if (!autoplay || count < 2) return
    const timer = setTimeout(() => goTo((index + 1) % count), autoplay)
    return () => clearTimeout(timer)
  }, [index, autoplay, count])

  return { trackRef, index, goTo, onScroll }
}
