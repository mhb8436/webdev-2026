// 메인 페이지 - "/" 경로
// 서버 컴포넌트에서 클라이언트 컴포넌트를 import
import TodoApp from '@/components/TodoApp';

export default function Home() {
  return (
    <main>
      <h1>전체 할일</h1>
      {/* filter를 지정하지 않으면 기본값 'all'로 전체 표시 */}
      <TodoApp filter="all" />
    </main>
  );
}
