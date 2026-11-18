/* 헤드스파7 7주년 이벤트 안내 */
export const INSTAGRAM_URL = 'https://www.instagram.com/headspa7_official'

export const eventInfo = {
  image: '/images/main/outside-right-2.png',
  intro: [
    '헤드스파7이 7주년을 맞이했습니다!',
    '여러분의 사랑에 감사드리며, 이벤트를 준비했습니다!',
    '친구들과 함께 헤드스파7 7주년을 축하하고, 푸짐한 선물도 챙겨가세요!',
  ],

  steps: [
    { title: '헤드스파7 팔로우하기', desc: '@headspa7_official' },
    { title: '이벤트 게시물 스토리 공유', desc: '본인 계정 스토리에 공유해 주세요. 헤드스파7 계정 태그 필수!' },
    { title: '참여 완료 댓글 작성하기', desc: '스토리 공유 후 이벤트 게시물에 댓글을 남겨 주세요.' },
  ],
  stepTip: '댓글로 친구 소환하면 당첨 확률 UP',

  giftTitle: '헤드스파7에서 꾸준히 사랑받는 헤어케어템 2종 증정!',
  giftCount: '총 7명',
  // 당첨 선물 상품 (products.json 의 id)
  giftProductIds: [10, 13],
  giftNames: ['프리미엄 트리트먼트', '시즌4 리페어 듀얼 앰플 트리트먼트'],

  schedule: [
    { label: '참여 기간', value: '11월 10일(화) ~ 12월 11일(금)' },
    { label: '당첨자 발표', value: '12월 23일(월)', note: '개별 연락 예정' },
  ],

  notices: [
    '해당 이벤트는 전체 공개 계정만 참여가 가능합니다. (비공개 계정은 참여 여부 확인 불가)',
    '공유 후 해당 스토리는 24시간 동안 전체 공개로 게시되어야 합니다.',
    '공유하신 스토리 게시물은 추후 헤드스파7 마케팅 자료로 활용될 수 있습니다.',
  ],
}
