/* 수량 선택 [-] 1 [+] (1 ~ 99) */
function QtyStepper({ value, onChange, label = '수량' }) {
  return (
    <div className="qty-stepper" role="group" aria-label={label}>
      <button type="button" aria-label="수량 줄이기" disabled={value <= 1} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label="수량 늘리기" disabled={value >= 99} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  )
}

export default QtyStepper
