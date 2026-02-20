// 완료 목록 페이지 - "/completed" 경로
// filter='completed'를 전달하여 완료된 항목만 표시
import TodoApp from '@/components/TodoApp';

export default function CompletedPage() {
  return (
    <main>
      <h1>완료된 할일</h1>
      {/* 완료된 할일만 필터링하여 표시 */}
      <TodoApp filter="completed" />
    </main>
  );
}
