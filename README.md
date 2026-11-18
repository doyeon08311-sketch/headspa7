# 헤드스파7 쇼핑몰 리뉴얼

헤드스파7 쇼핑몰을 새로 디자인한 연습용 프로젝트예요. (실제 운영 사이트가 아니에요)

**배포 사이트:** https://headspa7.vercel.app

## 주요 기능
- 상품 목록 · 상세 · 검색 · 장바구니 · 최근 본 상품
- 회원가입 · 로그인 (Firebase Authentication — 이메일/비밀번호, Google)
- 쿠폰함 (회원가입 축하 쿠폰과 이용 조건)
- 토스페이먼츠 결제창 결제 (테스트 모드 — 실제로 돈이 나가지 않아요)
- 비회원이 구매하면 로그인 후 장바구니로 돌아오기

## 기술
React 19 · Vite · React Router · Firebase Auth · 토스페이먼츠 SDK v2 · Vercel (서버 함수로 결제 승인)

## 내 컴퓨터에서 실행하기
```bash
npm install
cp .env.example .env.local   # 값 채우기 (아래 참고)
npm run dev                  # http://localhost:5173
```

`.env.local` 에 넣는 값:

| 이름 | 설명 |
|---|---|
| `VITE_FIREBASE_API_KEY` 등 4개 | Firebase 콘솔 > 프로젝트 설정 > 내 앱 |
| `VITE_TOSS_CLIENT_KEY` | 토스페이먼츠 API 개별 연동 키 – 클라이언트 키 (`test_ck_…`) |
| `TOSS_SECRET_KEY` | 같은 곳의 시크릿 키 (`test_sk_…`) — **`VITE_` 를 붙이지 마세요** (브라우저에 노출됨) |

값이 비어 있으면 로그인 · 결제는 연습용(브라우저에만 저장, 결제 없이 주문 완료)으로 동작해요.
