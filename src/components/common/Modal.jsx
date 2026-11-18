import { useEffect, useId, useRef } from 'react'
import Icon from './Icon.jsx'
import './Modal.css'

/* 알림 모달 (브라우저 기본 <dialog> 사용)
   - Esc 키, 바깥(어두운 부분) 클릭, 확인 버튼으로 닫힘
   - 열려 있는 동안 포커스가 모달 안에 머묾 */
function Modal({ open, icon, title, children, confirmLabel = '확인', onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // 바깥(배경) 클릭 시 닫기
  const handleClick = (event) => {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog ref={dialogRef} className="modal" aria-labelledby={titleId} onClose={onClose} onClick={handleClick}>
      <div className="modal-box">
        {icon && (
          <span className="modal-icon" aria-hidden="true">
            <Icon name={icon} size={26} />
          </span>
        )}
        <h2 id={titleId} className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
        <button type="button" className="btn btn--primary btn--block modal-confirm" onClick={onClose} autoFocus>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}

export default Modal
