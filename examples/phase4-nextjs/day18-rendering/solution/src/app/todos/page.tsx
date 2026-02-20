// 미완료 할일 페이지 - 서버 컴포넌트
// 서버에서 미완료 할일만 필터링하여 가져옴
import { getActiveTodos } from '@/lib/todos';
import TodoApp from '@/components/TodoApp';

export default async function TodosPage() {
  // 서버에서 미완료 할일만 가져오기
  const activeTodos = await getActiveTodos();

  return (
    <main>
      <h1>
        미완료 할일
        <span className="component-badge badge-server">서버 컴포넌트</span>
      </h1>
      {/* 미완료 할일만 전달, 입력 폼은 숨김 */}
      <TodoApp initialTodos={activeTodos} showForm={false} />
      <p className="data-source">서버에서 미완료 항목만 필터링하여 로딩됨</p>
    </main>
  );
}
