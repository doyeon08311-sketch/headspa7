/* 이모지 이미지 — 컴퓨터 · 휴대폰마다 그림체가 달라지지 않도록 SVG 파일로 표시
   - 그림 출처: Microsoft Fluent Emoji (MIT 라이선스, public/images/emoji/LICENSE.txt)
   - 사용: <Emoji name="gift" />  (글자 크기에 맞춰 1.15em) */
const FILES = {
  ballot: 'ballot-box.svg',
  gift: 'gift.svg',
  megaphone: 'megaphone.svg',
  pushpin: 'pushpin.svg',
  raisingHands: 'raising-hands.svg',
}

function Emoji({ name, size = '1.15em' }) {
  return (
    <img
      src={`/images/emoji/${FILES[name]}`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ display: 'inline-block', width: size, height: size, verticalAlign: '-0.2em' }}
    />
  )
}

export default Emoji
