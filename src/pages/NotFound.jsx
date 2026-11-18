import EmptyState from '../components/common/EmptyState.jsx'

/* 없는 주소 · 없는 상품 */
function NotFound({ message = '페이지를 찾을 수 없어요.' }) {
  return <EmptyState title={message} desc="주소가 바뀌었거나 사라진 페이지예요." linkTo="/" linkLabel="메인으로 돌아가기" />
}

export default NotFound
