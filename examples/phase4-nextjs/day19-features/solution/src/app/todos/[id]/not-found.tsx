// 개별 할일을 찾을 수 없을 때 표시되는 페이지
// getTodoById()에서 할일을 못 찾고 notFound()가 호출되면 이 컴포넌트가 렌더링됩니다
import Link from 'next/link';

export default function TodoNotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <h3>할일을 찾을 수 없습니다</h3>
      <p>요청하신 할일이 존재하지 않거나 삭제되었습니다.</p>
      <Link href="/todos">할일 목록으로 돌아가기</Link>
    </div>
  );
}
