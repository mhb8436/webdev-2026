// 메인 페이지 - 서버 컴포넌트 (async 함수로 데이터 직접 패칭)
// 'use client'가 없으므로 서버에서 실행됨
import { getTodos } from '@/lib/todos';
import TodoApp from '@/components/TodoApp';

export default async function Home() {
  // 서버에서 직접 데이터를 가져옴 (API 호출 없이!)
  const todos = await getTodos();

  return (
    <main>
      <h1>
        할일 관리
        <span className="component-badge badge-server">서버 컴포넌트</span>
      </h1>
      {/* 서버에서 가져온 데이터를 클라이언트 컴포넌트에 props로 전달 */}
      <TodoApp initialTodos={todos} showForm={true} />
      <p className="data-source">초기 데이터: 서버에서 로딩됨</p>
    </main>
  );
}
