// 미완료 할일 페이지 - "/todos" 경로
// filter='active'를 전달하여 미완료 항목만 표시
import TodoApp from '@/components/TodoApp';

export default function TodosPage() {
  return (
    <main>
      <h1>미완료 할일</h1>
      {/* 미완료 할일만 필터링하여 표시 */}
      <TodoApp filter="active" />
    </main>
  );
}
