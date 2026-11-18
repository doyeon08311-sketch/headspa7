import { useEffect } from 'react'

/* PC 마우스로 가로 목록을 끌어서 넘기기
   - 터치(휴대폰)는 브라우저 기본 스와이프를 그대로 사용
   - 놓으면 가장 가까운 칸에 맞춰 멈춤 (끈 방향으로 한 칸 이상 이동)
   - 끌다가 놓을 때 링크가 클릭되지 않도록 막음 */
export default function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let startX = 0
    let startScroll = 0
    let dragging = false
    let moved = false

    const items = () => Array.from(el.children)
    const padLeft = () => parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
    const itemPos = (item) => item.offsetLeft - el.offsetLeft - padLeft()

    const onDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      dragging = true
      moved = false
      startX = e.clientX
      startScroll = el.scrollLeft
      el.style.scrollSnapType = 'none' // 끄는 동안은 칸 맞춤 해제
      el.classList.add('is-dragging')
    }

    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 5) moved = true
      el.scrollLeft = startScroll - dx
    }

    const onUp = (e) => {
      if (!dragging) return
      dragging = false
      el.classList.remove('is-dragging')

      // 끈 방향을 고려해 멈출 칸 찾기
      const dx = e.clientX - startX
      const current = el.scrollLeft
      const positions = items().map(itemPos)
      let target = positions.reduce((a, b) => (Math.abs(b - current) < Math.abs(a - current) ? b : a), 0)
      if (Math.abs(dx) > 40) {
        const startIdx = positions.reduce((best, p, i) => (Math.abs(p - startScroll) < Math.abs(positions[best] - startScroll) ? i : best), 0)
        const nextIdx = Math.min(Math.max(startIdx + (dx < 0 ? 1 : -1), 0), positions.length - 1)
        target = dx < 0 ? Math.max(target, positions[nextIdx]) : Math.min(target, positions[nextIdx])
      }

      el.scrollTo({ left: target, behavior: 'smooth' })
      // 부드럽게 이동이 끝난 뒤 칸 맞춤 다시 켜기
      setTimeout(() => { el.style.scrollSnapType = '' }, 450)
    }

    // 끌었을 때는 링크 클릭 무시
    const onClick = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }

    // 링크·이미지를 끌면 브라우저가 '끌어다 놓기'를 시작해 마우스 이벤트를 가로채므로 막음
    const onNativeDrag = (e) => e.preventDefault()

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    el.addEventListener('click', onClick, true)
    el.addEventListener('dragstart', onNativeDrag)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      el.removeEventListener('click', onClick, true)
      el.removeEventListener('dragstart', onNativeDrag)
    }
  }, [ref])
}
